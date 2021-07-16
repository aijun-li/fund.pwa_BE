import axios from 'axios'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import timezone from 'dayjs/plugin/timeZone.js'
import utc from 'dayjs/plugin/utc.js'
import express from 'express'
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
    results.map(({ fundcode, name, gsz, gszzl, gztime }) => ({
      code: fundcode,
      name: name,
      est: gsz,
      rate: `${gszzl > 0 ? '+' : ''}${gszzl}`,
      time: dayjs.tz(gztime, 'YYYY-MM-DD HH:mm', config.zone).valueOf()
    }))
  )
})

app.listen(config.port, () => {
  console.log(`Express listening at port ${config.port}`)
})
