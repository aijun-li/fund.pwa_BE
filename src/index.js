import axios from 'axios'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import timezone from 'dayjs/plugin/timeZone.js'
import utc from 'dayjs/plugin/utc.js'
import express from 'express'
import parseDetail from './commonjs/parseDetail.cjs'
import config from './config.js'
import endpoints from './endpoints.js'
import { extractJSONP } from './utils.js'

const app = express()

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Shanghai')

// fund search suggestions
app.get('/suggestions', async ({ query: { keyword } }, res) => {
  const {
    data: { Datas: data }
  } = await axios.get(endpoints.suggestions(keyword))
  const suggestions = data
    .filter((fund) => fund.CATEGORYDESC === '基金')
    .map((fund) => ({
      code: fund.CODE,
      name: fund.NAME,
      type: fund.FundBaseInfo.FTYPE,
      manager: fund.FundBaseInfo.JJJL.split(','),
      theme: fund.ZTJJInfo.map((theme) => theme.TTYPENAME)
    }))
  res.send(suggestions)
})

// estimated value of fund
app.get('/estimated', async ({ query: { codes } }, res) => {
  const responses = await Promise.all(
    codes.split(',').map((code) => axios.get(endpoints.estimated(code)))
  )
  const results = responses.map((response) => extractJSONP(response.data))

  res.send(
    results.map(({ fundcode, gsz, gszzl, gztime }) => ({
      code: fundcode,
      est: gsz,
      rate: `${gszzl > 0 ? '+' : ''}${gszzl}`,
      time: dayjs.tz(gztime, 'YYYY-MM-DD HH:mm', config.zone).valueOf()
    }))
  )
})

// net value of fund
app.get('/net', async ({ query: { codes } }, res) => {
  codes = codes.split(',')

  const responses = await Promise.all(
    codes.map((code) =>
      axios.get(endpoints.net(code, 1, 1), {
        headers: {
          referer: 'https://fund.eastmoney.com'
        }
      })
    )
  )
  const results = responses.map((response, index) =>
    Object.assign(response.data.Data.LSJZList[0], { CODE: codes[index] })
  )

  res.send(
    results.map(({ FSRQ, DWJZ, CODE, JZZZL }) => ({
      code: CODE,
      net: DWJZ,
      rate: `${JZZZL > 0 ? '+' : ''}${JZZZL}`,
      time: dayjs.tz(FSRQ, 'YYYY-MM-DD', config.zone).valueOf()
    }))
  )
})

// fund detail
app.get('/detail/:code', async ({ params: { code } }, res) => {
  const { data } = await axios.get(endpoints.detail(code))

  res.send(parseDetail(data))
})

app.listen(config.port, () => {
  console.log(`Express listening at port ${config.port}`)
})
