import { DateStateType } from "@/types";

export const isValidDateAndDeadline = (
  date: DateStateType,
  deadline: DateStateType
): {
  isValid: boolean;
  message?: string;
} => {
  const now = new Date();

  const parseDateTime = (date: string, time: string): Date => {
    if (!/^\d{2}:\d{2}$/.test(time)) {
      throw new Error("Invalid time format: " + time);
    }

    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    let selectedDate: Date;

    if (date === "Today") {
      selectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (date === "Tomorrow") {
      selectedDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
    } else {
      const parts = date.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts.map((p) => parseInt(p, 10));
        selectedDate = new Date(year, month - 1, day);
      } else {
        throw new Error("Invalid date format: " + date);
      }
    }

    selectedDate.setHours(hour, minute, 0, 0);
    return selectedDate;
  };

  const isDateFilled = date.date && date.time;
  const isDeadlineFilled = deadline.date && deadline.time;

  if (!isDateFilled && !isDeadlineFilled) {
    return {
      isValid: false,
      message: "Please select a date and time.",
    };
  }

  if (isDateFilled && !isDeadlineFilled) {
    try {
      const startDateTime = parseDateTime(date.date!, date.time!);
      if (startDateTime < now) {
        return {
          isValid: false,
          message: "Start time can't be in the past.",
        };
      }
      return {
        isValid: true,
      };
    } catch {
      return {
        isValid: false,
        message: "Invalid start date/time format.",
      };
    }
  }

  if (isDateFilled && isDeadlineFilled) {
    try {
      const startDateTime = parseDateTime(date.date!, date.time!);
      const endDateTime = parseDateTime(deadline.date!, deadline.time!);

      if (startDateTime < now) {
        return {
          isValid: false,
          message: "Start time can't be in the past.",
        };
      }

      if (endDateTime < startDateTime) {
        return {
          isValid: false,
          message: "End time can't be before start time.",
        };
      }

      if (startDateTime.getTime() === endDateTime.getTime()) {
        return {
          isValid: false,
          message: "Start and end time can't be the same.",
        };
      }

      return {
        isValid: true,
      };
    } catch {
      return {
        isValid: false,
        message: "Invalid date or time format.",
      };
    }
  }

  return {
    isValid: false,
    message: "Please select a start date and time first.",
  };
};

export const formatDate = (selectedDate: Date) => {
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

  if (dateOnly.getTime() === today.getTime()) {
    return "Today";
  } else if (dateOnly.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  } else {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

export const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hour = hours.toString().padStart(2, "0");

  const roundedMinute = ["00", "15", "30", "45"].reduce((prev, curr) =>
    Math.abs(parseInt(curr) - minutes) < Math.abs(parseInt(prev) - minutes)
      ? curr
      : prev
  );

  return { hour, minute: roundedMinute, ampm };
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

  const hourStr = hours.toString().padStart(2, "0");
  const minuteStr = minutes.toString().padStart(2, "0");

  return {
    hour: hourStr,
    minute: minuteStr,
  };
};

export const getCurrentTimeInMinutes = (hour: string, minute: string) => {
  return Number(hour) * 60 + Number(minute);
};
