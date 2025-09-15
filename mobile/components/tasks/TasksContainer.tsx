import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

import ErrorComponent from "@/components/ui/Error";
import Task from "./Task";
import { AppDispatch, RootState } from "@/store/store";
import { getTasksAction } from "@/store/actions/tasksActions";
import { handleError } from "@/utils/handleError";
import { TaskStateType } from "@/types/task";
import ScrollContainer from "@/components/ui/ScrollContainer";
import useColorScheme from "@/common/hooks/useColorScheme";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { DETAILS_SCREEN } from "@/constants/routes";
import Loader from "@/components/ui/Loader";

const TasksContainer = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const sort = useSelector((state: RootState) => state.tasks.sort);

  const [error, setError] = useState<string | null>(null);

  const handleNavigateToCreateTask = () => {
    router.replace(DETAILS_SCREEN);
  };

  const handleGetTasksData = async () => {
    try {
      const { error: err } = await dispatch(getTasksAction(filter, sort));
      if (err) {
        setError(err);
        return;
      }
      setError(null);
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
    } 
  };

  useEffect(() => {
    handleGetTasksData();
  }, [filter, sort]);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <ErrorComponent message={error} setMessage={setError} isModal={true} />
      {tasks.length > 0 && !loading ? (
        <ScrollContainer type="column" contentContainerStyle={{ gap: 13 }}>
          {tasks.map((task: TaskStateType) => (
            <Task key={task.id} task={task} />
          ))}
        </ScrollContainer>
      ) : (
        <View style={styles.createTaskContainer}>
          <Text style={[styles.createTaskTitle, { color: theme.colors.text }]}>
            Create your first task
          </Text>
          <Text
            style={[
              styles.createTaskDescription,
              { color: theme.colors.inactive },
            ]}
          >
            Your productivity journey begins here.
          </Text>
          <AnimatedButton
            label="Create"
            isLoading={loading}
            onPress={handleNavigateToCreateTask}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createTaskContainer: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  createTaskTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  createTaskDescription: {
    fontSize: 16,
    fontWeight: "400",
  },
  createTaskButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
  },
});

export default TasksContainer;
