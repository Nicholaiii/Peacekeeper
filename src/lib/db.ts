import mongoose from 'mongoose'

import { env } from './env'
import { log } from './log'
export async function startDatabase () {
  mongoose.connection.on('open', () => {
    log.info('Connected to database')
  })

  await mongoose.connect(env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: env.NODE_ENV === 'development'
  })

}
