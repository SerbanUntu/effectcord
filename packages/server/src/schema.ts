import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core"

export const todos = pgTable("todos", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  text: text("text").notNull(),
  done: boolean("done").notNull().default(false)
})
