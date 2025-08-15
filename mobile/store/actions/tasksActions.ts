import { Dispatch } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Task, ActionType } from "@/types";
import { handleError } from "@/utils/handleError";
import { createTask, getTasks } from "@/store/slices/tasksSlice";
import { resetNewTask } from "@/store/slices/newTaskSlice";

export const createTaskAction =
  (newTask: Task) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      if (!newTask.title) {
        return {
          error: "Title is required",
        };
      }

      if (!newTask.label) {
        return {
          error: "Label is required.",
        };
      }

      console.log(newTask)

      const stored = await AsyncStorage.getItem("tasks");
      const tasks: Task[] = stored ? JSON.parse(stored) : [];
      tasks.push(newTask);

      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));

      dispatch(createTask(newTask));
      dispatch(resetNewTask());

      return {
        error: null,
      };
    } catch (err) {
      const error = handleError(err, "Failed to create task");
      return {
        error,
      };
    }
  };

export const getTasksAction =
  () =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

      dispatch(getTasks(tasks));
      return {
        error: null,
      };
    } catch (err) {
      const error = handleError(err, "Failed to get tasks");
      return {
        error,
      };
    }
  };
