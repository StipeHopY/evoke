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

export type TaskDateAndTimeType = {
  date: RawDateType;
  time: TimeType;
};

export type TaskDeadlineType = TaskDateAndTimeType;

export type TaskStartDateType = TaskDateAndTimeType & {
  startDate: string | null;
  reminder: ReminderType | null;
};

export type RawDateType = {
  day: number;
  month: number;
  year: number;
};

export type DaysOfWeekType = {
  label: DayLabelType;
  value: DayValueType;
}[];

