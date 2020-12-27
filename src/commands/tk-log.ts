import { Interaction } from '../structures/interaction'
import { Choices } from '../lib/commands'
import { Command } from '../structures/command'
import { TeamkillModel } from '../models/teamkill'


class tkLog extends Command  {
  name = 'tk-log'
  description = 'Log a teamkill'

  options = [
    {
      name: 'Killer',
      description: 'Who killed someone?',
      type: 6,
      required: true
    },
    {
      name: 'Victim',
      description: 'Who was the unlucky bastard?',
      type: 6
    },
    {
      name: 'Explanation',
      description: 'What was their piss-poor excuse?',
      type: 3
    }
  ]

  public async execute (choices: Choices, interaction: Interaction) {
    const killer = choices.get('killer')
    const snitch = interaction.member.user.id
    const victim = choices.get('victim') || snitch
    const explanation = choices.get('explanation') || 'of reasons?'
    const { guild_id } = interaction

    TeamkillModel.create({ killer, victim, explanation, snitch, guild_id })

    return `<@${killer}> killed <@${victim}> because *${explanation}* `
  }
}

export default new tkLog
