import { Dispatch } from "redux";
import { desc, eq } from "drizzle-orm";
import { nanoid } from "@reduxjs/toolkit";

import { ActionType } from "@/types";
import { handleError } from "@/utils/handleError";
import { getTasks, clearTasks, createTask, setLoading } from "@/store/slices/tasksSlice";
import { resetNewTask } from "@/store/slices/newTaskSlice";
import { db, tasks, labels } from "@/db/database";
import { SortType, TaskStateType } from "@/types/task";
import { FilterType } from "@/types/task";
import { MAX_TASKS } from "@/constants/data";

export const getTasksAction =
  (filter: FilterType, sort: SortType) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      dispatch(setLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 4000));
      
      const storedTasks = await db
        .select()
        .from(tasks)
        .leftJoin(labels, eq(tasks.labelId, labels.id))
        .orderBy(desc(tasks.createdAt))
        .limit(MAX_TASKS);

      const tasksState: TaskStateType[] = storedTasks.map((table) => {
        const label = table.labels_table;
        const task = { ...table.tasks_table, label };

        return task;
      });

      await dispatch(getTasks(tasksState));
      dispatch(setLoading(false));
      return { error: null };
    } catch (err) {
      const error = handleError(err, "Failed to get tasks");
      return { error };
    }
  };

export const createTaskAction =
  (newTask: Omit<TaskStateType, "id">) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      if (!newTask.title) return { error: "Title is required" };
      if (!newTask.labelId) return { error: "Label is required" };

      const now = new Date().toISOString();
      const label = await db
        .select()
        .from(labels)
        .where(eq(labels.id, newTask.labelId))
        .limit(1);

      const task = {
        ...newTask,
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
      };

      await db.insert(tasks).values({
        ...task,
      });

      dispatch(createTask({ ...task, label: label[0] }));
      dispatch(resetNewTask());

      return { error: null };
    } catch (err) {
      console.error(err);
      const error = handleError(err, "Failed to create task");
      return { error };
    }
  };

export const clearTasksAction = () => async (dispatch: Dispatch) => {
  dispatch(clearTasks());
};
