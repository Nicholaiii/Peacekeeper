import { Command } from '../structures/command'

const tkLog: Command = {
  name: 'tk-log',
  description: 'Log a teamkill',
  options: [
    {
      name: 'Killer',
      description: 'Who killed someone?',
      type: 6,
      required: true
    }
  ],
  async execute () {
    console.log('test')
  }
}

export default tkLog
