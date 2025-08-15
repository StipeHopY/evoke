import {
  TaskDateType,
  DateType,
  DayValueType,
  TimeType,
  RawDateType,
} from "@/types";

// TODO: originise this file
// parseDateTime can be used somehow with dateChange function at bottom or only her
export const isValidDateAndDeadline = (
  startDate: TaskDateType,
  deadline?: TaskDateType | null
): {
  isValid: boolean;
  message: string | null;
} => {
  const now = new Date();

  const buildDateTime = (rawDate: RawDateType, time: TimeType) => {
    return new Date(
      rawDate.year,
      rawDate.month - 1,
      rawDate.day,
      time.hour,
      time.minute,
      0,
      0
    );
  };

  const isDateFilled = startDate.date && startDate.time;
  const isDeadlineFilled = deadline?.date && deadline.time;

  if (!isDateFilled && !isDeadlineFilled) {
    return {
      isValid: false,
      message: "Please select a date and time.",
    };
  }

  if (isDateFilled && !isDeadlineFilled) {
    const startDateTime = buildDateTime(startDate.date.raw, startDate.time);
    if (startDateTime < now) {
      return {
        isValid: false,
        message: "Start time can't be in the past.",
      };
    }
    return { isValid: true, message: null };
  }

  if (isDateFilled && isDeadlineFilled) {
    const startDateTime = buildDateTime(startDate.date.raw, startDate.time);
    const endDateTime = buildDateTime(deadline.date.raw, deadline.time);

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

export const formatDate = (selectedDate: Date): DateType => {
  const date = new Date(selectedDate);
  const now = new Date();

  const stripTime = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const dateOnly = stripTime(date);
  const today = stripTime(now);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let ui = "";
  let raw = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };

  if (dateOnly.getTime() === today.getTime()) {
    ui = "Today";
  } else if (dateOnly.getTime() === tomorrow.getTime()) {
    ui = "Tomorrow";
  } else if (dateOnly.getTime() === yesterday.getTime()) {
    ui = "Yesterday";
  } else {
    const dayStr = String(raw.day).padStart(2, "0");
    const monthStr = String(raw.month).padStart(2, "0");
    ui = `${dayStr}/${monthStr}/${raw.year}`;
  }

  return {
    ui,
    raw,
  };
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
  weekdays: DayValueType[]
) => {
  if (days.length === 0) {
    return "Never";
  } else if (days.length === 7) {
    return "Every day";
  } else if (weekdays.every((day) => days.includes(day)) && days.length === 5) {
    return "Weekdays";
  } else if (days.length === 1) {
    return days[0];
  } else {
    const last = days[days.length - 1];
    const rest = days.slice(0, -1);
    return `${rest.join(", ")} & ${last}`;
  }
};
