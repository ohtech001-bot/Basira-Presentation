import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { uiAssets } from '../src/data/uiAssets.ts';

interface InventoryImage {
  index: number;
  file: string;
  width: number;
  height: number;
  bytes: number;
}

const projectRoot = new URL('../', import.meta.url);
const originalDirectory = new URL('ui/', projectRoot);
const servedDirectory = new URL('public/assets/ui/', projectRoot);
const inventory = JSON.parse(
  readFileSync(new URL('previews/asset-inventory.json', projectRoot), 'utf8'),
) as InventoryImage[];
const imageFiles = (directory: URL) =>
  readdirSync(directory)
    .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
    .sort();
const digest = (data: Buffer) => createHash('sha256').update(data).digest('hex');

function jpegDimensions(data: Buffer) {
  assert.equal(data.readUInt16BE(0), 0xffd8, 'JPEG must begin with the SOI marker');
  let offset = 2;
  while (offset < data.length) {
    assert.equal(data[offset++], 0xff, 'Expected a JPEG segment marker');
    while (data[offset] === 0xff) offset++;
    const marker = data[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    const length = data.readUInt16BE(offset);
    assert.ok(length >= 2 && offset + length <= data.length, 'JPEG segment fits its file');
    if (
      [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(
        marker,
      )
    ) {
      return { width: data.readUInt16BE(offset + 5), height: data.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  throw new Error('No JPEG dimensions found');
}

test('every supplied image has a matching local served asset', () => {
  const expected = inventory.map(({ file }) => file).sort();
  assert.deepEqual(imageFiles(originalDirectory), expected);
  assert.deepEqual(imageFiles(servedDirectory), expected);
  assert.equal(new Set(expected).size, inventory.length, 'No duplicate inventory filenames');
  for (const { file } of inventory) {
    const source = readFileSync(new URL(file, originalDirectory));
    const served = readFileSync(new URL(file, servedDirectory));
    assert.equal(digest(served), digest(source), `${file} retains its original pixels and colors`);
  }
});

test('supplied JPEG files have valid headers and the measured aspect ratios', () => {
  for (const { file, width, height, bytes } of inventory) {
    const assetPath = new URL(file, servedDirectory);
    const data = readFileSync(assetPath);
    assert.equal(data.byteLength, bytes, fileURLToPath(assetPath));
    assert.deepEqual(jpegDimensions(data), { width, height }, file);
  }
});

test('the semantic registry points to all supplied files using their measured dimensions', () => {
  const mappedAssets = Object.values(uiAssets);
  assert.deepEqual(
    mappedAssets.map(({ sourceFile }) => sourceFile).sort(),
    inventory.map(({ file }) => file).sort(),
  );
  for (const asset of mappedAssets) {
    const measured = inventory.find(({ file }) => file === asset.sourceFile);
    assert.ok(measured, asset.title);
    assert.equal(asset.width, measured.width, asset.title);
    assert.equal(asset.height, measured.height, asset.title);
    const route = new URL(asset.src, new URL('public/', projectRoot));
    assert.equal(
      digest(readFileSync(route)),
      digest(readFileSync(new URL(asset.sourceFile, servedDirectory))),
      asset.title,
    );
  }
});
