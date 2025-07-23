import { HttpApiBuilder, HttpMiddleware } from "@effect/platform"
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"
import { createServer } from "node:http"
import { ApiLive } from "./Api.js"
import { Config } from "./Config.js"
import { TodosRepository } from "./TodosRepository.js"

const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(ApiLive),
  Layer.provide(TodosRepository.Default),
  Layer.provide(Config.Default),
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
)

Layer.launch(HttpLive).pipe(
  Effect.catchTag("ParseError", (ParseError) =>
    Effect.logFatal(
      `Error parsing the environment variables:\n${ParseError.message}`
    )),
  Effect.catchTag("ServeError", (ServeError) =>
    Effect.logFatal(
      `There was an error when trying to start the server:\n${ServeError.message}`
    )),
  NodeRuntime.runMain
)
