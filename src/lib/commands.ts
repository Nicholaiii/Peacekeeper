import { Client, TextChannel } from 'discord.js'
import interactions, { ApplicationCommandOption, ApplicationCommandOptionChoice, ApplicationOptions } from 'discord-slash-commands-client'
import { omit, pick, prop } from 'ramda'
import { Command } from '../structures/command'
import { Interaction } from '../structures/interaction'
import { env } from './env'

/* Commands */
import tkLog from '../commands/tk-log'

const commands: Record<string, Command> = {
  [tkLog.name]: tkLog
}

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

  await Object.values(commands).map(command =>
    client.interactions.createCommand(pickData(command), env.DEV_GUILD)
  )

  try {
    /* getCommands will fail until this pr lands;
     * https://github.com/MatteZ02/discord-interactions/pull/5
     * Monkeypatch your node_modules/discord-slash-commands-clients
     * with those changes
     */
  } catch (e) {
    /* If you reach here, you forgot to patch */
    console.error(e)
  }

  // @ts-ignore
  client.ws.on('INTERACTION_CREATE', async (interaction: Interaction) => {
    console.dir(interaction, { depth: 5 })
    const response = await commands[interaction.data.name].execute(
      interaction.data.options.reduce(reduceChoices, new Map<string, string>()),
      interaction.member
    )

    const channel = await client.channels.fetch(interaction.channel_id)
    ;(channel as TextChannel).send(response)
  })

  return Object.keys(commands)
}

export type Choices = Map<string, string>
function reduceChoices (choices: Choices, choice: ApplicationCommandOptionChoice): Choices {
  choices.set(choice.name, choice.value)
  return choices
}
