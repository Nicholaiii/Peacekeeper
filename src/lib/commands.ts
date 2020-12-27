import { Client, Guild, TextChannel } from 'discord.js'
import interactions, { ApplicationCommandOptionChoice, ApplicationOptions } from 'discord-slash-commands-client'
import { omit } from 'ramda'

import { Command } from '../structures/command'
import { Interaction } from '../structures/interaction'

import { env } from './env'
import { log } from './log'

/* Commands */
import tkLog from '../commands/tk-log'
import tkLast from '../commands/tk-last'
import tkTop from '../commands/tk-top'
import tkHelp from '../commands/tk-help'

const commands: Map<Command['name'], Command> = new Map([
  tkLog,
  tkLast,
  tkTop,
  tkHelp
].map(command => [command.name, command]))

interface InteractionClient extends Client {
  interactions?: interactions.Client
}

const pickData: (
  command: Command
) => ApplicationOptions = omit(['execute'])

function createCommands (guild: string, client: InteractionClient) {
  commands.forEach(command => client.interactions?.createCommand(pickData(command), guild))
}

export async function loadCommands (
  client: InteractionClient
): Promise<String[]> {
  /*
   * Temporary hack untill d.js fixes slash commands;
   * Don't try this at home
   */
  client.interactions = new interactions.Client(env.DISCORD_TOKEN, env.DISCORD_ID)

  const setupGuild = (guild: Guild) => createCommands(guild.id, client)

  /* Setup commands on all servers on join; ruh-roh, potential ratelimit? */
  client.guilds.cache.forEach(setupGuild)

  /* Add commands when bot joins a new server */
  client.on('guildCreate', setupGuild)

  // @ts-ignore This is seriously just a hack. Get rid of it eventually.
  client.ws.on('INTERACTION_CREATE', async (interaction: Interaction) => {
    console.log(interaction.member.user.username, 'calls', interaction.data.name, interaction.data.options ?? null)
    const response = await commands.get(interaction.data.name)?.execute(
      reduceChoices(interaction.data.options),
      interaction,
      client
    )

    const channel = await client.channels.fetch(interaction.channel_id)
    ;(channel as TextChannel).send(response ?? `I don't know this command, or something wen't wrong :(`)
  })

  return [...commands.keys()]
}

export type Choices = Map<string, string>
function reduceToMap (choices: Choices, choice: ApplicationCommandOptionChoice): Choices {
  choices.set(choice.name, choice.value)
  return choices
}

function reduceChoices(options: ApplicationCommandOptionChoice[]) {
  return options ? options.reduce(reduceToMap, new Map<string, string>()) : null
}
