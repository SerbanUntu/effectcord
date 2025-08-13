import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "@effect/platform"
import { Schema } from "effect"

export const TodoId = Schema.Number.pipe(Schema.brand("TodoId"))
export type TodoId = typeof TodoId.Type

export const TodoIdFromString = Schema.NumberFromString.pipe(
  Schema.compose(TodoId)
)

export class Todo extends Schema.Class<Todo>("Todo")({
  id: TodoId,
  text: Schema.NonEmptyTrimmedString,
  done: Schema.Boolean
}) {}

export class TodoNotFound extends Schema.TaggedError<TodoNotFound>()("TodoNotFound", {
  id: Schema.Number
}) {}

export class DatabaseError extends Schema.TaggedError<DatabaseError>()("DatabaseError", {
  message: Schema.String
}) {}

export class TodosApiGroup extends HttpApiGroup.make("todos")
  .add(
    HttpApiEndpoint.get("getAllTodos", "/todos").addSuccess(Schema.Array(Todo)).addError(DatabaseError, { status: 500 })
  )
  .add(
    HttpApiEndpoint.get("getTodoById", "/todos/:id")
      .addSuccess(Todo)
      .addError(TodoNotFound, { status: 404 })
      .addError(DatabaseError, { status: 500 })
      .setPath(Schema.Struct({ id: TodoIdFromString }))
  )
  .add(
    HttpApiEndpoint.post("createTodo", "/todos")
      .addSuccess(Todo)
      .addError(DatabaseError, { status: 500 })
      .setPayload(Schema.Struct({ text: Schema.NonEmptyTrimmedString }))
  )
  .add(
    HttpApiEndpoint.patch("completeTodo", "/todos/:id")
      .addSuccess(Todo)
      .addError(TodoNotFound, { status: 404 })
      .addError(DatabaseError, { status: 500 })
      .setPath(Schema.Struct({ id: TodoIdFromString }))
  )
  .add(
    HttpApiEndpoint.del("removeTodo", "/todos/:id")
      .addSuccess(Schema.Void)
      .addError(TodoNotFound, { status: 404 })
      .addError(DatabaseError, { status: 500 })
      .setPath(Schema.Struct({ id: TodoIdFromString }))
  )
{}

export class TodosApi extends HttpApi.make("api").add(TodosApiGroup) {}
