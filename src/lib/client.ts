import { Client } from 'discord.js'

import { env } from './env'
import { log } from './log'

import { loadCommands } from './commands'

export let client: Client

export function login () {
  client = new Client()

  client.login(env.DISCORD_TOKEN)

  client.on('ready', async () => {
    log.info('Connected to Discord')

    log.info(`Loaded commands`, await loadCommands(client))
  })

  // @ts-ignore
  client.ws.on('INTERACTION_CREATE', async interaction => {
    console.log(interaction)
  })
}
