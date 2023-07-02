const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`active Crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(`Error in crawling ${currentURL}: ${response.status}`);
      return pages;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      console.log(`Error in crawling ${currentURL}: ${contentType}`);
      return pages;
    }

    const htmlBody = await response.text();
    const nextURLs = getUrlsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.log(`Error crawling ${currentURL}: ${error}`);
  }
  return pages;
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
