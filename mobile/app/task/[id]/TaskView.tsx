import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TaskStateType } from "@/types/task";
import { getSingleTaskAction } from "@/store/actions/tasksActions";
import ScreenContainer from "@/components/ui/ScreenContainer";

const TaskView = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [task, setTask] = useState<TaskStateType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSingleTask = async () => {
    const { data, error } = await getSingleTaskAction(id);
    if (error) {
      setTask(null);
      setError(error);
      return;
    }

    setTask(data);
    setError(null);
    return;
  };

  useEffect(() => {
    if (id) {
      handleSingleTask();
    }
  }, [id]);

  return (
    <ScreenContainer>
      <Text>Task Title: {task?.title}</Text>
    </ScreenContainer>
  );
};

export default TaskView;
