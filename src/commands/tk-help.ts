import { Command } from "../structures/command"
import { MessageEmbed } from "discord.js"

class tkHelp extends Command {
  name = 'tk-help'
  description = 'Show most recent TKs'

  async execute () {
    const embed = new MessageEmbed()

    embed.setTitle('Peacekeeper')
    embed.setColor('BLUE')
    embed.setDescription('Teamkills? Not in my Tarkov!')
    embed.addField('Getting started', `Type /tk to start using the bots commands`)
    embed.addField('Tips', 'Hit [tab] to finish a field and go to next field, or you can just click the field you want')

    embed.setFooter(`Made by nicholai#1312 | https://github.com/Nicholaiii/Peacekeeper`)

    return embed
  }
}

export default new tkHelp()
