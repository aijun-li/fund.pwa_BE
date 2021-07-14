import express from 'express'
import config from './config.js'

const app = express()

app.listen(config.port, () => {
  console.log(`Express listening at port ${config.port}`)
})
