import axios from 'axios'
import express from 'express'
import config from './config.js'
import endpoints from './endpoints.js'

const app = express()

// fund search suggestions
app.get('/suggestions/:keyword', async ({ params: { keyword } }, res) => {
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

app.listen(config.port, () => {
  console.log(`Express listening at port ${config.port}`)
})
