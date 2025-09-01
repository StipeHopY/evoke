import { asc, desc } from "drizzle-orm";

import { tasks } from "@/db/schema";
import { SortId } from "@/types/task";
import { buildDateTime } from "./dateUtils";

export const getSortOrder = (sort: SortId) => {
    const now = new Date();
    // const taskStartDate = buildDateTime(tasks.start.date)
  
  switch (sort) {
    // case "soonest":
    //   return asc(tasks.start);
    case "newest":
      return desc(tasks.createdAt);
    case "oldest":
      return asc(tasks.createdAt);
    case "az":
      return asc(tasks.title);
    case "za":
      return desc(tasks.title);
    default:
      return desc(tasks.createdAt);
  }
};
