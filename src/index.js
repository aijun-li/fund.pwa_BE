import express from 'express'
import config from './config.js'
import { fundRouter } from './routers/index.js'

const app = express()

app.use('/fund', fundRouter)

app.listen(config.port, () => {
  console.log(`Express listening at port ${config.port}`)
})
