import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'


export function connectDB() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
  return mongoose.connect(dbURI, opts)
}

export function truncateDB() {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection

    const promises = Object.keys(collections).map(collection => 
      mongoose.connection.collection(collection).deleteMany({})
    )

    return Promise.all(promises)
  }
}

export function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}