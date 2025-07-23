import { drizzle } from "drizzle-orm/node-postgres"
import { Effect, Schema } from "effect"
import { Config } from "./Config.js"
import * as schema from "./schema.js"

export class DatabaseError extends Schema.TaggedError<DatabaseError>()("DatabaseError", {
  message: Schema.String
}) {}

export class Database extends Effect.Service<Database>()("api/Database", {
  effect: Effect.gen(function*() {
    const { env } = yield* Config
    const db = drizzle(env.DATABASE_URL, { schema })

    type DbType = typeof db

    function runQuery<A>(
      f: (db: DbType) => Promise<A>
    ): Effect.Effect<A, DatabaseError, never> {
      return Effect.tryPromise({
        try: () => f(db),
        catch: (unknown) => {
          let message = "There was an error when communicating to the database"
          if (unknown instanceof Error) {
            message = `${message}:\n${unknown.message}`
          }
          return new DatabaseError({ message })
        }
      })
    }

    return { runQuery } as const
  })
}) {}
