import { Client } from "discord.js"
import interactions, { ApplicationOptions } from "discord-slash-commands-client"
import { omit, pick, prop } from 'ramda'
import { Command } from '../structures/command'
import { env } from './env'

/* Commands */
import tkLog from '../commands/tk-log'

const commands: Command[] = [
  tkLog
]

interface InteractionClient extends Client {
  interactions?: interactions.Client
}

const pickData: (
  command: Command
) => ApplicationOptions = omit(['execute'])

export async function loadCommands (
  client: InteractionClient
): Promise<String[]> {
  /*
   * Temporary hack untill d.js fixes slash commands;
   * Don't try this at home
   */
  client.interactions = new interactions.Client(env.DISCORD_TOKEN, env.DISCORD_ID)

  await commands.map(command =>
    client.interactions.createCommand(pickData(command), env.DEV_GUILD)
  )

  // @ts-ignore
  client.ws.on('INTERACTION_CREATE', async interaction => {
    console.log(interaction)
  })

  return commands.map(prop('name'))
}
