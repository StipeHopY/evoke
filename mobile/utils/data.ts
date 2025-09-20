import { and, asc, desc, eq, gte, lt } from "drizzle-orm";

import { tasks } from "@/db/schema";
import { FilterId, SortId } from "@/types/task";
import { FILTER_OPTIONS } from "@/constants/data";

export const sortTasks = (sort: SortId) => {
  switch (sort) {
    case "soonest":
      return asc(tasks.startDate);
    case "newest":
      return desc(tasks.createdAt);
    case "oldest":
      return asc(tasks.createdAt);
    case "az":
      return asc(tasks.title);
    case "za":
      return desc(tasks.title);
    default:
      return desc(tasks.startDate);
  }
};

export const filterTasks = (filter: FilterId) => {
  const now = new Date();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  const day = startOfWeek.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  startOfWeek.setDate(startOfWeek.getDate() + diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  endOfWeek.setMilliseconds(-1);

  switch (filter) {
    case "all":
      return undefined;
    case "today":
      return and(
        gte(tasks.startDate ?? tasks.createdAt, startOfDay.toISOString()),
        lt(tasks.startDate ?? tasks.createdAt, endOfDay.toISOString())
      );
    case "week":
      return and(
        gte(tasks.startDate, startOfWeek.toISOString()),
        lt(tasks.startDate, endOfWeek.toISOString())
      );
    case "high":
      return eq(tasks.highPriority, true);
    default:
      const isCustom = !FILTER_OPTIONS.some((opt) => opt.id === filter);
      if (isCustom) {
        return eq(tasks.labelId, filter);
      }

      return undefined;
  }
};
