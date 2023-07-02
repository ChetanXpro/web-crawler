const { crawlPage } = require("./crawl.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("Usage: node main.js <websiteName>");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Expected one argument, got more the one argument");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`Crawling ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
