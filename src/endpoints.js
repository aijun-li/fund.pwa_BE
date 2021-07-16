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
  },
  estimated(code) {
    return `http://fundgz.1234567.com.cn/js/${code}.js`
  },
  net(fundCode, pageIndex, pageSize) {
    return urlWithQuery('http://api.fund.eastmoney.com/f10/lsjz', {
      fundCode,
      pageIndex,
      pageSize
    })
  }
}
