import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { labels } from "./label.schema";
import { DayValueType, ReminderType } from "@/types/date";

export const tasks = sqliteTable("tasks_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description"),
  labelId: text("label_id").references(() => labels.id),
  startDateSelected: integer("start_date_selected", { mode: "boolean" })
    .notNull()
    .$default(() => false),
  startYear: integer("start_year"),
  startMonth: integer("start_month"),
  startDay: integer("start_day"),
  startHour: integer("start_hour"),
  startMinute: integer("start_minute"),
  deadlineDateSelected: integer("deadline_date_selected", { mode: "boolean" })
    .notNull()
    .$default(() => false),
  deadlineYear: integer("deadline_year"),
  deadlineMonth: integer("deadline_month"),
  deadlineDay: integer("deadline_day"),
  deadlineHour: integer("deadline_hour"),
  deadlineMinute: integer("deadline_minute"),
  reminder: text("reminder", { mode: "json" }).$type<ReminderType | null>(),
  repeat: text("repeat", { mode: "json" }).$type<DayValueType[] | null>(),
  highPriority: integer("high_priority", { mode: "boolean" })
    .notNull()
    .$default(() => false),
  points: integer("points")
    .notNull()
    .$default(() => 0),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});
