import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PageFlip } from '../src/components/animations/PageFlip';

const front = (
  <article lang="ar" aria-label="المحتوى التقليدي">
    <h2>قبل التجربة</h2>
    <button type="button" data-action="front">
      اقرأ عن المسجد الأقصى
    </button>
  </article>
);
const back = (
  <article lang="ar" aria-label="المحتوى التفاعلي">
    <h2>داخل التجربة</h2>
    <button type="button" data-action="back">
      تجوّل واكتشف
    </button>
  </article>
);

function openingTag(markup: string, className: string): string {
  const tags = markup.match(/<div\b[^>]*>/g) || [];
  const tag = tags.find((candidate) => {
    const classes = candidate.match(/\bclass="([^"]*)"/)?.[1].split(/\s+/) || [];
    return classes.includes(className);
  });
  assert.ok(tag, `Expected the ${className} element to be rendered`);
  return tag;
}

function assertFace(tag: string, active: boolean): void {
  assert.match(tag, new RegExp(`aria-hidden="${!active}"`));
  if (active) {
    assert.doesNotMatch(tag, /\binert(?:\s|=|>)/);
    assert.match(tag, /pointer-events:auto/);
  } else {
    assert.match(tag, /\binert=""/);
    assert.match(tag, /pointer-events:none/);
  }
}

test('PageFlip starts RTL with only the front face accessible and interactive', () => {
  const markup = renderToStaticMarkup(<PageFlip front={front} back={back} flipped={false} />);
  assert.match(openingTag(markup, 'page-flip'), /dir="rtl"/);
  assertFace(openingTag(markup, 'page-flip__face--front'), true);
  assertFace(openingTag(markup, 'page-flip__face--back'), false);
  assert.doesNotMatch(openingTag(markup, 'page-flip'), /page-flip--turned/);
});

test('PageFlip exposes the back face and disables the front when turned', () => {
  const markup = renderToStaticMarkup(<PageFlip front={front} back={back} flipped />);
  assert.match(openingTag(markup, 'page-flip'), /dir="rtl"/);
  assert.match(openingTag(markup, 'page-flip'), /page-flip--turned/);
  assertFace(openingTag(markup, 'page-flip__face--front'), false);
  assertFace(openingTag(markup, 'page-flip__face--back'), true);
  // The controlled target turns toward the left rather than using a positive Y spin.
  assert.match(openingTag(markup, 'page-flip__leaf'), /rotateY\(-180deg\)/);
});

test('PageFlip retains caller-provided Arabic headings, semantic HTML and controls on both faces', () => {
  for (const flipped of [false, true]) {
    const markup = renderToStaticMarkup(
      <PageFlip front={front} back={back} flipped={flipped} className="presentation-comparison" />,
    );
    assert.match(openingTag(markup, 'page-flip'), /presentation-comparison/);
    assert.ok(markup.includes(renderToStaticMarkup(front)));
    assert.ok(markup.includes(renderToStaticMarkup(back)));
    assert.equal((markup.match(/data-action="front"/g) || []).length, 1);
    assert.equal((markup.match(/data-action="back"/g) || []).length, 1);
  }
});

test('PageFlip can return to the front without exposing the hidden back controls', () => {
  const render = (flipped: boolean) =>
    renderToStaticMarkup(<PageFlip front={front} back={back} flipped={flipped} />);
  const before = render(false);
  const turned = render(true);
  const returned = render(false);
  assert.notEqual(before, turned);
  assert.equal(returned, before);
  assertFace(openingTag(returned, 'page-flip__face--back'), false);
});
