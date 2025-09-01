import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const labels = sqliteTable("labels_table", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),

  value: text("value").notNull(),
});
