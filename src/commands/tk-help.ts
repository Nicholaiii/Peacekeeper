import { Command } from '../structures/command'
import { Client, MessageEmbed } from 'discord.js'
import { env } from '../lib/env'

class tkHelp extends Command {
  name = 'tk-help'
  description = 'Show most recent TKs'

  async execute (_: any, __: any, client: Client) {
    const embed = new MessageEmbed()

    embed.setColor('BLUE')

    embed.setAuthor('GitHub', 'https://imgur.com/tan1KPX.png', 'https://github.com/Nicholaiii/Peacekeeper')

    embed.setTitle('Peacekeeper')
    embed.setURL(`https://discord.com/oauth2/authorize?client_id=${env.DISCORD_ID}&scope=bot%20applications.commands&permissions=515136`)

    embed.setDescription('Teamkills? Not in my Tarkov!')

    embed.addField('Getting started', `Type /tk to start using the bots commands`)
    embed.addField('Tips', 'Hit [tab] to finish a field and go to next field, or you can just click the field you want')

    embed.setThumbnail('https://imgur.com/PLKg7Jf.png')
    embed.setFooter(`Made by nicholai#1312`)

    return embed
  }
}

export default new tkHelp()
