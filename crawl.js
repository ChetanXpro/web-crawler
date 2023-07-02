function normalizeURL(urlString) {
  const url = new URL(urlString);
  const hostPath = `${url.hostname}${url.pathname}`;
  // return hostPath.replace(/\/$/, "");
  if (hostPath.length > 0 && hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
};
