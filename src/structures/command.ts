import { ApplicationOptions  } from "discord-slash-commands-client"

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

export interface Command extends ApplicationOptions {
  execute (): Promise<any>
}
