export function getStrapiMedia(url) {
  if (url.startsWith('/')) {
    return 'http://localhost:1337' + url
  }

  return url
}
