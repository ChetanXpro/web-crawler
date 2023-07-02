const { JSDOM } = require("jsdom");

function getUrlsFromHTML(htmlBody, baseURL) {
  let urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  linkElements.forEach((linkElement) => {
    if (linkElement.href.startsWith("/")) {
      try {
        const urlObject = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObject.href);
      } catch (error) {
        console.log(`Error Relative url: ${error}`);
      }
    } else {
      try {
        const urlObject = new URL(linkElement.href);
        urls.push(urlObject.href);
      } catch (error) {
        console.log(`Error absolute url: ${error}`);
      }
    }
  });
  return urls;
}

function normalizeURL(urlString) {
  const url = new URL(urlString);
  const hostPath = `${url.hostname}${url.pathname}`;
  if (hostPath.length > 0 && hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getUrlsFromHTML,
};
