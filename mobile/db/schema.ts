import { InferSelectModel } from "drizzle-orm";

import { tasks } from "./schema/task.schema";
import { labels } from "./schema/label.schema";

export type LabelType = InferSelectModel<typeof labels>;
export * from "./schema/label.schema";

export type TaskType = InferSelectModel<typeof tasks>;
export * from "./schema/task.schema";
