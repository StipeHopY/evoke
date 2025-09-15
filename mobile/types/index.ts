// TODO: create sepreted files for these types

import { LabelType, TaskType } from "@/db/database";

export type RouteName = "home" | "chat" | "create" | "goals" | "options";

export type Theme = {
  colors: {
    active: string;
    background: string;
    border: string;
    buttonBgColor: string;
    buttonTextColor: string;
    disabled: string;
    inactive: string;
    main: string;
    selected: string;
    text: string;
  };
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export type StoreState = {
  user: UserType | null;
  tasks: TaskWithLabel[];
  labels: LabelCustomType[];
};

export type ActionType = {
  error: string | null;
};

// TODO: delete everything below and for each type change path

export type ReminderType = {
  type: "Notification" | "Alarm" | "None";
  reminderOffset:
    | "None"
    | "At start time"
    | "5 minutes before start"
    | "15 minutes before start";
};

export type DayLabelType =
  | "Every Monday"
  | "Every Tuesday"
  | "Every Wednesday"
  | "Every Thursday"
  | "Every Friday"
  | "Every Saturday"
  | "Every Sunday";

export type DayValueType =
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun";

export type MinuteType = "00" | "15" | "30" | "45";

export type TimeType = {
  hour: number;
  minute: number;
};

export type RawDateType = {
  day: number;
  month: number;
  year: number;
};

export type LabelCustomType = {
  id: string;
  value: string;
};

export type LabelsType = {
  labels: LabelCustomType[];
};

export type UserType = {
  id: string;
  username: string | null;
  hasDownloadedDefaultLabels: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserState = UserType | null;

export type TaskWithLabel = TaskType & { label: LabelType | null };
