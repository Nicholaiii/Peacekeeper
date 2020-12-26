import { ApplicationCommandOptionChoice } from 'discord-slash-commands-client'
import { Interaction } from '../structures/interaction'
import { Choices } from '../lib/commands'
import { Command } from '../structures/command'

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
  public async execute (choices: Choices, member: Interaction['member']) {
    const killer = choices.get('killer')
    const victim = choices.get('victim') || member.user.id
    const explanation = choices.get('explanation') || 'of reasons?'

    return `<@${killer}> killed <@${victim}> because ${explanation}`
  }
}

export default new tkLog
