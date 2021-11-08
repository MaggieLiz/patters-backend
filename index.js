import express from 'express'

import { connectDB } from './db/helpers.js'
import { port } from './config/environment.js'
import logger from './lib/logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'

const app = express()

app.use(express.json())
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)

// * CONNECT TO SERVER
async function startServer() {
  try {
    await connectDB()
    console.log('🤖 Database has connected')
    app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
  } catch (err) {
    console.log('🤖 Something went wrong starting the App')
    console.log(err)
  }
}

startServer()




