

/*
 * All but Command are temporary structures,
 * untill slash commands lands on d.js.
 */

/* https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
interface ApplicationCommandOption {
  type: ApplicationCommandOptionType,
  name: String,
  description: String,
  required?: Boolean
}

/* https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
type ApplicationCommandOptionType = 3 | 6

export enum CommandTypes {
  USER = 6,
  STRING = 3
}

export interface Command {
  name: String
  description: String,
  options?: ApplicationCommandOption[]
  execute (): Promise<any>
}
