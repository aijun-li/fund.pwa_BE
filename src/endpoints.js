import { urlWithQuery } from './utils.js'

export default {
  suggestions(keyword) {
    return urlWithQuery(
      'https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx',
      {
        m: 1,
        key: keyword
      }
    )
  }
}
