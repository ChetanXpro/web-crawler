const { normalizeURL, getUrlsFromHTML } = require("./crawl");
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

test("getUrlsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="https://chetan.com/home">Home</a>
        <a href="https://chetan.com/about">About</a>
        <a href="https://chetan.com/contact">Contact</a>
    </body>
  </html>
  
  `;
  const baseURL = "https://chetan.com";
  const actual = getUrlsFromHTML(inputHTMLBody, baseURL);
  const expected = [
    "https://chetan.com/home",
    "https://chetan.com/about",
    "https://chetan.com/contact",
  ];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML relative ", () => {
  const inputHTMLBody = `
    <html>
      <body>
          <a href="/home/">Home</a>
      
      </body>
    </html>
    
    `;
  const baseURL = "https://chetan.com";
  const actual = getUrlsFromHTML(inputHTMLBody, baseURL);
  const expected = ["https://chetan.com/home/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML both relative and absolute ", () => {
  const inputHTMLBody = `
      <html>
        <body>
        <a href="https://chetan.com/home/">Home</a>
            <a href="/about/">Home</a>
        
        </body>
      </html>
      
      `;
  const baseURL = "https://chetan.com";
  const actual = getUrlsFromHTML(inputHTMLBody, baseURL);
  const expected = ["https://chetan.com/home/", "https://chetan.com/about/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML invalid url", () => {
  const inputHTMLBody = `
        <html>
          <body>
          <a href="invalid">invalid</a>         
          </body>
        </html>
        
        `;
  const baseURL = "https://chetan.com";
  const actual = getUrlsFromHTML(inputHTMLBody, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
