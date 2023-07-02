const { crawlPage } = require("./crawl.js");

function main() {
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
  crawlPage(baseURL);
}

main();
