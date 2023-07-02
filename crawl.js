const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  try {
    console.log(`active Crawling`);
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(`Error in crawling ${currentURL}: ${response.status}`);
      return;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      console.log(`Error in crawling ${currentURL}: ${contentType}`);
      return;
    }
    const htmlBody = await response.text();
    console.log(htmlBody);
  } catch (error) {
    console.log(`Error crawling ${currentURL}: ${error}`);
  }
}

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
  crawlPage,
};
