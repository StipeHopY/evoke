import { weekdays } from "@/constants/date";
import {
  DayValueType,
  TimeType,
  RawDateType,
  TaskStartDateType,
  DaysOfWeekType,
} from "@/types/date";
import { TaskDateAndTimeType } from "@/types/date";

import { TaskDeadlineType } from "@/types/date";
import { TaskStateType, TaskWithLabel } from "@/types/task";

export const buildDateTime = (rawDate: RawDateType, time?: TimeType) => {
  return new Date(
    rawDate.year!,
    rawDate.month! - 1,
    rawDate.day!,
    time?.hour ?? 0,
    time?.minute ?? 0,
    0,
    0
  );
};

export const isToday = (date: Date): boolean => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export const isValidStartAndDeadline = (
  start: TaskDateAndTimeType,
  deadline: TaskDeadlineType | null
): {
  isValid: boolean;
  message: string | null;
} => {
  const now = new Date();

  const isDateFilled = start.date && start.time;
  const isDeadlineFilled = deadline?.date && deadline.time;

  if (!isDateFilled && !isDeadlineFilled) {
    return {
      isValid: false,
      message: "Please select a date and time.",
    };
  }

  if (isDateFilled && !isDeadlineFilled) {
    const startDateTime = buildDateTime(start.date!, start.time!);
    if (startDateTime < now) {
      return {
        isValid: false,
        message: "Start time can't be in the past.",
      };
    }
    return { isValid: true, message: null };
  }

  if (isDateFilled && isDeadlineFilled) {
    const startDateTime = buildDateTime(start.date!, start.time!);
    const endDateTime = buildDateTime(deadline.date!, deadline.time!);

    if (startDateTime < now) {
      return {
        isValid: false,
        message: "Start time can't be in the past.",
      };
    }
    if (endDateTime < startDateTime) {
      return {
        isValid: false,
        message: "Deadline can't be before start time.",
      };
    }
    if (startDateTime.getTime() === endDateTime.getTime()) {
      return {
        isValid: false,
        message: "Start and deadline time can't be the same.",
      };
    }

    return { isValid: true, message: null };
  }

  return {
    isValid: false,
    message: "Please select a start date and time first.",
  };
};

export const getRawDate = (selectedDate: Date): RawDateType => {
  const date = new Date(selectedDate);

  const raw = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };

  return raw;
};

export const getRoundedCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  minutes = Math.ceil(minutes / 15) * 15;
  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }

  if (hours === 24) hours = 23;

  return {
    hour: hours,
    minute: minutes,
  };
};

export const formatRepeatLabel = (
  days: DayValueType[],
  weekdays: DaysOfWeekType
): string => {
  if (days.length === 0) {
    return "Repeat";
  }
  if (days.length === 7) {
    return "Every day";
  }

  if (
    weekdays.map((day) => day.value).every((day) => days.includes(day)) &&
    days.length === 5
  ) {
    return "Weekdays";
  }

  if (days.length === 1) {
    const day = weekdays.find((d) => d.value === days[0]);
    return day?.label ?? `Every ${days[0]}`;
  }

  if (days.length === 2) {
    return `${days[0]} and ${days[1]}`;
  }

  const last = days[days.length - 1];
  const rest = days.slice(0, -1);
  return `${rest.join(", ")} and ${last}`;
};

export const formatTimeUnit = (value?: number | null): string => {
  return String(value ?? 0).padStart(2, "0");
};

export const formatDateIntoUI = (rawDate: RawDateType): string => {
  const now = new Date();
  const date = buildDateTime(rawDate);

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isToday(date)) {
    return "Today";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    const dayStr = String(rawDate.day).padStart(2, "0");
    const monthStr = String(rawDate.month).padStart(2, "0");
    return `${dayStr}/${monthStr}/${rawDate.year}`;
  }
};

export const handleDeadlineValues = (
  task: Omit<TaskStateType, "id">
): TaskDeadlineType | null => {
  const {
    deadlineDateSelected,
    deadlineYear,
    deadlineMonth,
    deadlineDay,
    deadlineHour,
    deadlineMinute,
  } = task;

  if (!deadlineDateSelected) {
    return null;
  }

  return {
    date: {
      day: deadlineDay!,
      month: deadlineMonth!,
      year: deadlineYear!,
    },
    time: {
      hour: deadlineHour!,
      minute: deadlineMinute!,
    },
  };
};

// TODO: make some functions to remove using these ! at the end

export const handleStartValues = (
  task: Omit<TaskStateType, "id">
): TaskStartDateType | null => {
  const {
    startDateSelected,
    startYear,
    startMonth,
    startDay,
    startHour,
    startMinute,
    reminder,
  } = task;

  if (!startDateSelected) {
    return null;
  }

  return {
    date: {
      day: startDay!,
      month: startMonth!,
      year: startYear!,
    },
    time: {
      hour: startHour!,
      minute: startMinute!,
    },
    reminder,
  };
};
