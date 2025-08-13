import { Todo, TodoId, TodoNotFound } from "@template/domain/TodosApi"

import { eq } from "drizzle-orm"
import { Effect } from "effect"
import { DatabaseError } from "../../domain/src/TodosApi.js"
import { Database } from "./Database.js"
import { todos } from "./schema.js"

export class TodosRepository extends Effect.Service<TodosRepository>()("api/TodosRepository", {
  effect: Effect.gen(function*() {
    const { runQuery } = yield* Database

    const getAll = (): Effect.Effect<Array<Todo>, DatabaseError, never> =>
      runQuery((db) => db.query.todos.findMany()).pipe(
        Effect.map((rows) =>
          rows.map((row) =>
            new Todo({
              ...row,
              id: TodoId.make(row.id)
            })
          )
        )
      )

    const getById = (id: TodoId) => {
      return runQuery((db) => db.query.todos.findFirst({ where: eq(todos.id, id) })).pipe(
        Effect.flatMap((row) =>
          row === undefined ?
            Effect.fail(new TodoNotFound({ id }))
            : Effect.succeed(new Todo({ ...row, id: TodoId.make(row.id) }))
        )
      )
    }

    const create = (text: string) => {
      return runQuery((db) => db.insert(todos).values({ text }).returning()).pipe(
        Effect.flatMap((rows) =>
          rows.length !== 1 ?
            Effect.fail(new DatabaseError({ message: "Todo was created but could not be returned " }))
            : Effect.succeed(new Todo({ ...rows[0], id: TodoId.make(rows[0].id) }))
        )
      )
    }

    const complete = (id: TodoId) => {
      return runQuery((db) => db.update(todos).set({ done: true }).returning()).pipe(
        Effect.flatMap((rows) =>
          rows.length !== 1 ?
            Effect.fail(new TodoNotFound({ id }))
            : Effect.succeed(new Todo({ ...rows[0], id: TodoId.make(rows[0].id) }))
        )
      )
    }

    const remove: (id: TodoId) => Effect.Effect<void, DatabaseError, never> = (id) => {
      return runQuery((db) => db.delete(todos).where(eq(todos.id, id)))
    }

    return {
      getAll,
      getById,
      create,
      complete,
      remove
    } as const
  })
}) {}
