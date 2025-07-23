import { type Config } from "drizzle-kit"
import { Effect } from "effect"
import type { ParseError } from "effect/ParseResult"
import { Config as ConfigService, type Env } from "./src/Config"

const envProgram = Effect.gen(function*() {
  const { env } = yield* ConfigService
  return env
}).pipe(
  Effect.provide(ConfigService.Default)
)

const env = Effect.runSync<Env, ParseError>(envProgram)

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  out: "./drizzle-output",
  dbCredentials: {
    url: env.DATABASE_URL
  },
  tablesFilter: "*"
} satisfies Config
