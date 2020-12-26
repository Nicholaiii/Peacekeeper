import { ApplicationCommandOptionChoice } from 'discord-slash-commands-client'

export interface Interaction {
  id: string
  token: string
  member: {
    user: {
      id: string
    }
  }
  data: {
    options: ApplicationCommandOptionChoice[]
    name: string
  }
  channel_id: string
}
