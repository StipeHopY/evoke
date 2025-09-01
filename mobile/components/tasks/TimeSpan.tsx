import { View, Text, StyleSheet } from "react-native";
import { Calendar, Clock9 } from "lucide-react-native";

import { TaskDeadlineType } from "@/types/date";
import { TaskStartDateType } from "@/types/date";
import useColorScheme from "@/common/hooks/useColorScheme";
import {
  buildDateTime,
  formatDateIntoUI,
  formatTimeUnit,
  isToday,
} from "@/utils/dateUtils";

type TimeSpanType = {
  start: TaskStartDateType | null;
  deadline: TaskDeadlineType | null;
};

// TODO: task date ui like "Today" is for nothing because that title is only for that day,
// when next day comes it will still show "Today"

// NOTES: when there is a big span time between start and deadline show each day task

const TimeSpan = ({ start, deadline }: TimeSpanType) => {
  const theme = useColorScheme();

  if (!start?.date || !start?.time) return null;

  const formattedStartHour = formatTimeUnit(start.time.hour);
  const formattedStartMinute = formatTimeUnit(start.time.minute);

  const formattedDeadlineHour = formatTimeUnit(deadline?.time.hour);
  const formattedDeadlineMinute = formatTimeUnit(deadline?.time.minute);

  const taskDate = buildDateTime(start.date, start.time);
  const taskDeadline = deadline
    ? buildDateTime(deadline.date, deadline.time)
    : null;

  const isTaskDateToday = isToday(taskDate);
  const isTaskDeadlineToday = taskDeadline ? isToday(taskDeadline) : false;

  const getTaskDateLabel = formatDateIntoUI(start.date);
  const getTaskDeadlineLabel =
    !isTaskDeadlineToday && deadline
      ? formatDateIntoUI(deadline.date)
      : `${formattedDeadlineHour}:${formattedDeadlineMinute}`;

  const taskDateLabel = `${formattedStartHour}:${formattedStartMinute}${
    taskDeadline ? ` - ${getTaskDeadlineLabel}` : ""
  }`;

  return (
    <View
      style={[styles.dateContainer, { backgroundColor: theme.colors.border }]}
    >
      {isTaskDateToday ? (
        <>
          <Clock9
            style={{ marginRight: 5 }}
            color={theme.colors.inactive}
            size={18}
            strokeWidth={1.6}
          />
          <Text style={{ color: theme.colors.inactive }}>{taskDateLabel}</Text>
        </>
      ) : (
        <>
          <Calendar
            style={{ marginRight: 5 }}
            color={theme.colors.inactive}
            size={18}
            strokeWidth={1.6}
          />
          <Text style={{ color: theme.colors.inactive }}>
            {getTaskDateLabel}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default TimeSpan;
