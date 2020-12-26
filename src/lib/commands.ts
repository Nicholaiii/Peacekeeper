import { Client } from 'discord.js'
import { pick, prop } from 'ramda'

import { Command } from '../structures/command'

/* Commands */
import tkLog from '../commands/tk-log'

const commands: Command[] = [
  tkLog
]

const pickData = pick(['name', 'description'])

export async function loadCommands (
  client: Client
): Promise<String[]> {

  /*
   * Temporary hack untill d.js fixes slash commands;
   * Don't try this at home
   */

  await commands.map(command =>
    // @ts-ignore
    client.api.applications(client.user.id).commands.post({
      data: pickData(command)
    })
  )

  return commands.map(prop('name'))
}
