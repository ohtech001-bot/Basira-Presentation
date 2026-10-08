import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import {
  uiAssets,
  interfaceAssets,
  sceneAssetKeys,
  type UiAssetKey,
} from '../src/data/uiAssets.ts';

interface InventoryImage {
  index: number;
  key: UiAssetKey;
  file: string;
  width: number;
  height: number;
  bytes: number;
  sha256: string;
  servedFile: string;
  servedWidth: number;
  servedHeight: number;
  servedBytes: number;
  servedSha256: string;
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

function imageDimensions(data: Buffer, file: string) {
  if (/\.jpe?g$/i.test(file)) return jpegDimensions(data);
  if (/\.png$/i.test(file)) {
    assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Valid PNG signature');
    assert.equal(data.subarray(12, 16).toString('ascii'), 'IHDR');
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }
  assert.equal(data.subarray(0, 4).toString('ascii'), 'RIFF', 'Valid WebP RIFF header');
  assert.equal(data.subarray(8, 12).toString('ascii'), 'WEBP');
  assert.equal(data.readUInt32LE(4) + 8, data.length, 'Complete WebP file');
  for (let offset = 12; offset + 8 <= data.length;) {
    const type = data.subarray(offset, offset + 4).toString('ascii');
    const length = data.readUInt32LE(offset + 4);
    const payload = offset + 8;
    assert.ok(payload + length <= data.length, 'WebP chunk fits its file');
    if (type === 'VP8X') {
      return {
        width: data.readUIntLE(payload + 4, 3) + 1,
        height: data.readUIntLE(payload + 7, 3) + 1,
      };
    }
    if (type === 'VP8 ') {
      assert.equal(data.subarray(payload + 3, payload + 6).toString('hex'), '9d012a');
      return {
        width: data.readUInt16LE(payload + 6) & 0x3fff,
        height: data.readUInt16LE(payload + 8) & 0x3fff,
      };
    }
    if (type === 'VP8L') {
      assert.equal(data[payload], 0x2f);
      const dimensions = data.readUInt32LE(payload + 1);
      return { width: (dimensions & 0x3fff) + 1, height: ((dimensions >>> 14) & 0x3fff) + 1 };
    }
    offset = payload + length + (length % 2);
  }
  throw new Error(`No WebP dimensions found: ${file}`);
}

test('all 17 supplied images have readable originals and verified display copies', () => {
  assert.equal(inventory.length, 17);
  assert.deepEqual(imageFiles(originalDirectory), inventory.map(({ file }) => file).sort());
  assert.deepEqual(
    imageFiles(servedDirectory),
    inventory.map(({ servedFile }) => servedFile).sort(),
  );
  assert.equal(new Set(inventory.map(({ key }) => key)).size, 17);
  for (const record of inventory) {
    const original = readFileSync(new URL(record.file, originalDirectory));
    const served = readFileSync(new URL(record.servedFile, servedDirectory));
    assert.equal(original.length, record.bytes, record.file);
    assert.equal(digest(original), record.sha256, `Original retained: ${record.file}`);
    assert.equal(served.length, record.servedBytes, record.servedFile);
    assert.equal(
      digest(served),
      record.servedSha256,
      `Display copy is intact: ${record.servedFile}`,
    );
    assert.deepEqual(imageDimensions(original, record.file), {
      width: record.width,
      height: record.height,
    });
    assert.deepEqual(imageDimensions(served, record.servedFile), {
      width: record.servedWidth,
      height: record.servedHeight,
    });
  }
});

test('display optimization retains aspect ratios and the authentic logo unchanged', () => {
  for (const record of inventory) {
    assert.ok(record.servedWidth <= 1920 && record.servedHeight <= 1920, record.file);
    assert.ok(
      record.servedWidth <= record.width && record.servedHeight <= record.height,
      'No unnecessary upscaling',
    );
    // Integer pixel rounding may differ by at most one display pixel.
    assert.ok(
      Math.abs((record.servedWidth * record.height) / record.width - record.servedHeight) <= 1,
      `Uncropped ratio: ${record.file}`,
    );
  }
  const logo = inventory.find(({ key }) => key === 'logo');
  assert.ok(logo);
  assert.equal(logo.servedFile, 'logo.jpeg');
  assert.equal(logo.servedSha256, logo.sha256, 'Authentic logo is copied byte-for-byte');
  const sourceBytes = inventory.reduce((sum, { bytes }) => sum + bytes, 0);
  const displayBytes = inventory.reduce((sum, { servedBytes }) => sum + servedBytes, 0);
  assert.ok(
    displayBytes < sourceBytes * 0.2,
    'Display assets remove at least 80% of download size',
  );
});

test('the semantic registry includes all new named interfaces and accurate source/display metadata', () => {
  const expectedFiles: Record<UiAssetKey, string> = {
    logo: 'logo.jpeg',
    qaytbay: 'qaytbay-sabil.jpg',
    home: 'الرئيسية.png',
    exploration: 'السير في المحاكاة.png',
    landmark: 'شرح سبيل قايتباي.png',
    dome: 'قبة الصخرة.jpeg',
    tours: 'الجولات التعليمية.jpg',
    guidedTours: 'جولات ارشادية.jpeg',
    library: 'المكتبة المعرفية_ معالم الأقصى.png',
    quiz: 'اختبر معلوماتك.png',
    questions: 'اسئلة.jpeg',
    map: 'الخريطة التفاعلية.jpg',
    profile: 'صفحة الزائر.jpeg',
    profileDetail: 'صفحة الزائر 2.jpeg',
    competition: 'مسابقة جماعية.jpg',
    progress: 'تقدم الرحلة.png',
    mission: 'المهمة الحالية.jpg',
  };
  assert.deepEqual(
    Object.fromEntries(Object.entries(uiAssets).map(([key, { sourceFile }]) => [key, sourceFile])),
    expectedFiles,
  );
  assert.equal(interfaceAssets.length, 15);
  for (const [key, asset] of Object.entries(uiAssets)) {
    const measured = inventory.find((record) => record.key === key);
    assert.ok(measured, asset.title);
    assert.equal(asset.sourceWidth, measured.width, asset.title);
    assert.equal(asset.sourceHeight, measured.height, asset.title);
    assert.equal(asset.width, measured.servedWidth, asset.title);
    assert.equal(asset.height, measured.servedHeight, asset.title);
    assert.equal(asset.servedFile, measured.servedFile, asset.title);
    const route = new URL(asset.src, new URL('public/', projectRoot));
    assert.equal(digest(readFileSync(route)), measured.servedSha256, asset.title);
  }
  for (const keys of Object.values(sceneAssetKeys)) {
    for (const key of keys)
      assert.ok(key in uiAssets, `Preload refers to a supplied asset: ${key}`);
  }
});
