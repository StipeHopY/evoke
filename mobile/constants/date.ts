import {
  DayLabelType,
  DayValueType,
  MinuteType,
  RawDateType,
  ReminderType,
  TimeType,
} from "@/types";
import { DaysOfWeekType } from "@/types/date";
import { getRoundedCurrentTime } from "@/utils/dateUtils";

const now = new Date();
const roundedCurrTime = getRoundedCurrentTime();

export const defaultDate: RawDateType = {
  day: now.getDate(),
  month: now.getMonth() + 1,
  year: now.getFullYear(),
};

export const defaultTime: TimeType = {
  hour: roundedCurrTime.hour,
  minute: roundedCurrTime.minute,
};

export const defaultReminder: ReminderType = {
  type: "Notification",
  reminderOffset: "At start time",
};

export const weekdays: DaysOfWeekType = [
  { label: "Every Monday", value: "Mon" },
  { label: "Every Tuesday", value: "Tue" },
  { label: "Every Wednesday", value: "Wed" },
  { label: "Every Thursday", value: "Thu" },
  { label: "Every Friday", value: "Fri" },
  { label: "Every Saturday", value: "Sat" },
  { label: "Every Sunday", value: "Sun" },
];

export const minutes: MinuteType[] = ["00", "15", "30", "45"];
