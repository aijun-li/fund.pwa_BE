import express from 'express'
import config from './config.js'
import { fundRouter } from './routers/index.js'

const app = express()

app.use('/fund', fundRouter)

const port = process.env.FUND_PORT || config.port
app.listen(port, () => {
  console.log(`Express listening at port ${port}`)
})
