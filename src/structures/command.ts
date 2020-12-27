import { ApplicationOptions } from 'discord-slash-commands-client'
import { Client } from 'discord.js'
import { Choices } from '../lib/commands'
import { Interaction } from './interaction'

/*
 * type ApplicationCommandOptionType =
 * "SUB_COMMAND": 1 |
 * "SUB_COMMAND_GROUP": 2 |
 * "STRING": 3 |
 * "INTEGER": 4 |
 * "BOOLEAN": 5 |
 * "USER": 6 |
 * "CHANNEL": 7 |
 * "ROLE": 8
 */

export abstract class Command implements ApplicationOptions {
  name: string
  description: string

  public abstract execute (
    choices: Choices,
    interaction: Interaction,
    client: Client
  ): Promise<any>
}
