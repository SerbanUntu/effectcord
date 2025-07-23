import "dotenv/config"
import { Effect, Schema } from "effect"

export class Config extends Effect.Service<Config>()("api/Config", {
  effect: Effect.gen(function*() {
    const EnvSchema = Schema.Struct({
      DATABASE_URL: Schema.NonEmptyString
      // Any other env variable you need
    })

    const parseEnv = Schema.decodeUnknown(EnvSchema)
    const env = yield* parseEnv(process.env)

    return { env } as const
  })
}) {}
