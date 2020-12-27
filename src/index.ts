import { loadEnv, env } from './lib/env'
import { login } from './lib/client'
import { startDatabase } from './lib/db'
import { log } from './lib/log'

loadEnv()

log.info(`Running bot in ${env.NODE_ENV} mode`)

login()
startDatabase()
