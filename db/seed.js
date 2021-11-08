import Pattern from '../models/pattern.js'
import User from '../models/user.js'
import patternData from './data/pattern.js'
import { connectDB, disconnectDB, truncateDB } from './helpers.js'

async function seed() {
  try {
    await connectDB()
    console.log('Database Connected')

    await truncateDB()
    console.log('Database Dropped')

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@email.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true,
      avatar: 'https://t3.ftcdn.net/jpg/01/89/89/72/360_F_189897283_h5JyxhL6OyiQ71MIfzGVN0VJPIw0g4fE.jpg',
    })

    console.log('🤖 Admin user created')

    const pattern = await Pattern.create(patternData)
    console.log(`${pattern.length} Pattern added to the database`)

    console.log('Goodbye')
  } catch (err) {
    console.log('something went wrong')
    console.log(err)
  }
  disconnectDB()
}

seed()