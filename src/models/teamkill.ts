import { prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Team } from 'discord.js'


class Teamkill extends TimeStamps {
  @prop({ index: true })
  public guild_id: string

  @prop({ index: true })
  public killer: string

  @prop()
  public victim: string

  @prop()
  public explanation?: string

  @prop()
  public snitch: string

  /*public static async getTopList (
    this: ReturnModelType<typeof TeamkillClass>,
    guild_id: TeamkillClass['guild_id']
  ) {
    return this.find({ guild_id })
  }*/

  public static async getLatest (
    this: ReturnModelType<typeof Teamkill>,
    guild_id: Teamkill['guild_id']
  ) {
    return this.find({ guild_id }, null, { sort: '-createdAt', limit: 3 }).exec()
  }

  public static async getTopList (
    this: ReturnModelType<typeof Teamkill>,
    guild_id: Teamkill['guild_id']
  ) {
    return this.aggregate([
      { $match: { guild_id } },
      { $group: { _id: '$killer', count: { $sum: 1 } } },
      { $sort: { cound: -1 } },
      { $limit: 10 }
    ]).exec()
  }
}

export const TeamkillModel = getModelForClass(Teamkill)
