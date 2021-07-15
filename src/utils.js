export function urlWithQuery(url, query) {
  const queryString = encodeURI(
    Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&')
  )
  return `${url}?${queryString}`
}

export function extractJSONP(jsonp) {
  return JSON.parse(jsonp.match(/^.*?\((.*)\);?$/)[1])
}
