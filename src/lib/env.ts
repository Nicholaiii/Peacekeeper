import { EnvType, load } from 'ts-dotenv'

export type Env = EnvType<typeof schema>

export const schema = {
    DISCORD_TOKEN: String,
    DISCORD_ID: String,
    DEV_GUILD: {
      type: String,
      optional: true
    },
    NODE_ENV: [
        'production' as const,
        'development' as const,
    ]
}

export let env: Env

export function loadEnv(): void {
    env = load(schema)
}
