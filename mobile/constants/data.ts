import { FilterType, SortType, LabelCustomType } from "@/types/task";

export const dbName: string = process.env.EXPO_DATABASE_NAME ?? "evokeDB";

export const MAX_TASKS = 20;

export const MAX_LABELS = 20;

export const defaultLabels = [
  { id: "personal", value: "Personal" },
  { id: "work", value: "Work" },
  { id: "family", value: "Family" },
  { id: "travel", value: "Travel" },
  { id: "fitness", value: "Fitness" },
  { id: "finance", value: "Finance" },
  { id: "important", value: "Important" },
];

// NOTES: first one is default

export const SORT_OPTIONS: SortType[] = [
  { id: "soonest", value: "Soonest" },
  { id: "newest", value: "Newest" },
  { id: "oldest", value: "Oldest" },
  { id: "az", value: "A-Z" },
  { id: "za", value: "Z-A" },
];

export const FILTER_OPTIONS: FilterType[] = [
  { id: "all", value: "All" },
  { id: "today", value: "Today" },
  { id: "week", value: "Week" },
  { id: "high", value: "High" },
];

export const getFilterOptions = (labels: LabelCustomType[]): FilterType[] => {
  return [...FILTER_OPTIONS, ...labels];
};
