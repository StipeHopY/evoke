import { TaskType, LabelType } from "@/db/database";
import { DayValueType, TaskDateAndTimeType } from "./date";
import { ReminderType } from ".";

export type TaskWithLabel = TaskType & { label: LabelType | null };

// TODO: change this if works out
export type TaskStateType = Omit<TaskWithLabel, "reminder" | "repeat"> & {
  reminder: ReminderType | null;
  repeat: DayValueType[] | null;
};

export type TasksArrayType = {
  tasks: TaskWithLabel[];
  length: number,
  filter: FilterType;
  sort: SortType;
};

export type LabelCustomType = {
  id: string;
  value: string;
};

export type LabelsType = {
  labels: LabelCustomType[];
};

export type DataOrganizerType = {
  id: string;
  value: string;
};

export type FilterId = "today" | "week" | "all" | "high" | string;

export type FilterType = {
  id: FilterId;
  value: string;
};

export type SortId = "soonest" | "newest" | "oldest" | "az" | "za";

export type SortType = {
  id: SortId;
  value: string;
};
