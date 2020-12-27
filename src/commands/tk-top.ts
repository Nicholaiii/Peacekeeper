import { Interaction } from '../structures/interaction'
import { Command } from '../structures/command'
import { Choices } from '../lib/commands'
import { TeamkillModel } from '../models/teamkill'
import { Client, MessageEmbed } from 'discord.js'
import { prop } from 'ramda'

class tkTop extends Command {
  name = 'tk-top'
  description = 'Show TK highscores'

  async execute (choices: Choices, interaction: Interaction, client: Client) {
    const embed = new MessageEmbed()
    const { guild_id } = interaction

    const [ guild, topList ] = await Promise.all([
      client.guilds.fetch(guild_id),
      TeamkillModel.getTopList(guild_id) as Promise<({_id: string, count: number})[]>
    ])

    const members = await guild.members.fetch({ user: (topList).map(prop('_id')) })
    topList
      .map(m => ({ member: members.get(m._id), ...m }))
      .forEach(m => embed.addField(m.member.displayName, `${m.count} kills`))

    embed.setTitle('Most teamkills')
    embed.setColor('RANDOM')
    embed.setFooter(`Requested by ${interaction.member.user.username}`)

    return embed
  }
}

export default new tkTop()
