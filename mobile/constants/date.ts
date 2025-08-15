import {
  DateType,
  DayLabelType,
  DayValueType,
  MinuteType,
  ReminderType,
  TimeType,
} from "@/types";
import { getRoundedCurrentTime } from "@/utils/dateTimeHelpers";

const now = new Date();
const roundedCurrTime = getRoundedCurrentTime();

export const defaultDate: DateType = {
  raw: {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  },
  ui: "Today",
};

export const defaultTime: TimeType = {
  hour: roundedCurrTime.hour,
  minute: roundedCurrTime.minute,
};

export const defaultReminder: ReminderType = {
  type: "Notification",
  reminderOffset: "At start time",
};

type daysOfWeekType = {
  label: DayLabelType;
  value: DayValueType;
}[];

export const daysOfWeek: daysOfWeekType = [
  { label: "Every Monday", value: "Mon" },
  { label: "Every Tuesday", value: "Tue" },
  { label: "Every Wednesday", value: "Wed" },
  { label: "Every Thursday", value: "Thu" },
  { label: "Every Friday", value: "Fri" },
  { label: "Every Saturday", value: "Sat" },
  { label: "Every Sunday", value: "Sun" },
];

export const weekdays: DayValueType[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const minutes: MinuteType[] = ["00", "15", "30", "45"];
