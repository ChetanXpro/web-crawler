const { normalizeURL } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://chetan.com/home";
  const actual = normalizeURL(input);
  const expected = "chetan.com/home";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://chetan.com/home/";
  const actual = normalizeURL(input);
  const expected = "chetan.com/home";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://CHETAN.com/home/";
  const actual = normalizeURL(input);
  const expected = "chetan.com/home";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://chetan.com/home/";
  const actual = normalizeURL(input);
  const expected = "chetan.com/home";
  expect(actual).toEqual(expected);
});
