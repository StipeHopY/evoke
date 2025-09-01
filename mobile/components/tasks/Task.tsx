import { View, Text, StyleSheet } from "react-native";

import { fontSize } from "@/constants/colors";
import useColorScheme from "@/common/hooks/useColorScheme";
import { TaskStateType } from "@/types/task";
import TaskDateView from "./TimeSpan";
import { handleDeadlineValues, handleStartValues } from "@/utils/dateUtils";

type TaskType = {
  task: TaskStateType;
};

// NOTES: new label value and we get error Label aready exists even if its not
// TODO: on upstart label also change it to tasks if already is not

// NOTES: tasks you didn't finish today ask him if they want it again today or reschedule

const Task = ({ task }: TaskType) => {
  const theme = useColorScheme();

  const startDate = handleStartValues(task);
  const deadlineDate = handleDeadlineValues(task);

  return (
    <View
      style={[styles.taskContainer, { backgroundColor: theme.colors.main }]}
    >
      <View style={styles.leftSideContainer}>
        <Text
          style={[styles.taskText, { color: theme.colors.text }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {task.title}
        </Text>
        {task.label && (
          <Text
            style={[styles.taskLabel, { color: theme.colors.inactive }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {task.label.value}
          </Text>
        )}
      </View>

      {/* TODO: find a better design to show high container */}
      {(task.startDateSelected || task.highPriority) && (
        <View style={styles.rightSideContainer}>
          {task.startDateSelected && <TaskDateView start={startDate} deadline={deadlineDate} />}
          {task.highPriority && (
            <View
              style={[
                styles.highPriorityContainer,
                { borderColor: theme.colors.border },
              ]}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: fontSize.xs,
                }}
              >
                High
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  leftSideContainer: {
    flex: 1,
    flexShrink: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: fontSize.sm,
    fontWeight: "400",
  },
  taskLabel: {
    fontSize: fontSize.xs,
    fontWeight: "300",
  },
  startContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  rightSideContainer: {
    flexShrink: 0,
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
  },
  highPriorityContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 0, 0, 0.4)",
  },
});

export default Task;
