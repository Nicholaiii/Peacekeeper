import { Interaction } from "../structures/interaction"
import { Command } from "../structures/command"
import { Choices } from "../lib/commands"
import { TeamkillModel } from '../models/teamkill'
import { Client, MessageEmbed } from "discord.js"

class tkLast extends Command {
  name = 'tk-last'
  description = 'Show most recent TKs'

  async execute (choices: Choices, interaction: Interaction, client: Client) {
    const embed = new MessageEmbed()
    const { guild_id } = interaction

    const [ guild, lastThree ] = await Promise.all([
      client.guilds.fetch(guild_id),
      TeamkillModel.getLatest(guild_id)
    ])

    const embeds = await Promise.all(lastThree.map(async tk => {
      const memberIds = [
        tk.killer,
        tk.victim,
        tk.snitch
      ]

      const members = await guild.members.fetch({ user: memberIds })
      const [ killer, victim, snitch ] = memberIds.map(id => members.get(id))

      embed.addField(`${killer.displayName} killed ${victim.displayName}`, tk.explanation)
    }))

    embed.setTitle('Most recent teamkills')
    embed.setColor('RANDOM')
    embed.setFooter(`Requested by ${interaction.member.user.username}`)

    return embed
  }
}

export default new tkLast()
