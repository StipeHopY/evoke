import { Dispatch } from "redux";
import { and, sql, eq, inArray } from "drizzle-orm";
import { nanoid } from "@reduxjs/toolkit";

import { ActionType } from "@/types";
import { handleError } from "@/utils/handleError";
import {
  getTasks,
  clearTasks,
  createTask,
  setLength,
  removeTask,
} from "@/store/slices/tasksSlice";
import { resetNewTask } from "@/store/slices/newTaskSlice";
import { setStatus } from "@/store/slices/tasksSlice";
import { db, tasks, labels } from "@/db/database";
import {
  SortType,
  TaskStateType,
  TaskStatus,
  TaskWithLabel,
} from "@/types/task";
import { FilterType } from "@/types/task";
import { MAX_TASKS } from "@/constants/data";
import { filterTasks, sortTasks } from "@/utils/data";

export const getTasksLengthAction = () => async (dispatch: Dispatch) => {
  const totalTasksResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks);

  await dispatch(setLength(totalTasksResult[0].count));
};

export const getTasksAction =
  (filter: FilterType, sort: SortType) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      // NOTES: remove this promise
      // await new Promise((resolve) => setTimeout(resolve, 4000));

      const storedTasks = await db
        .select()
        .from(tasks)
        .leftJoin(labels, eq(tasks.labelId, labels.id))
        .where(
          and(
            filterTasks(filter.id),
            inArray(tasks.status, ["pending", "in_progress"])
          )
        )
        .orderBy(sortTasks(sort.id))
        .limit(MAX_TASKS);

      const tasksState: TaskStateType[] = storedTasks.map((table) => {
        const label = table.labels_table;
        const task = { ...table.tasks_table, label };

        return task;
      });

      await dispatch(getTasks(tasksState));
      return { error: null };
    } catch (err) {
      const error = handleError(err, "Failed to get tasks");
      return { error };
    }
  };

export const getSingleTaskAction = async (
  id: string | undefined
): Promise<{ error: string | null; data: TaskStateType | null }> => {
  try {
    if (!id) {
      return {
        error: "ID is required",
        data: null,
      };
    }

    const [result] = await db
      .select()
      .from(tasks)
      .leftJoin(labels, eq(tasks.labelId, labels.id))
      .where(eq(tasks.id, id));

    if (!result) {
      return { error: "Task not found", data: null };
    }

    const task: TaskStateType = {
      ...result.tasks_table,
      label: result.labels_table ? { ...result.labels_table } : null,
    };

    return {
      error: null,
      data: task,
    };
  } catch (err) {
    const error = handleError(err, "Failed to get task");
    return { error, data: null };
  }
};

export const createTaskAction =
  (newTask: Omit<TaskStateType, "id">) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      if (!newTask.title) {
        return { error: "Title is required" };
      }

      if (!newTask.labelId) {
        return { error: "Label is required" };
      }

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

export const changeTaskStatusAction =
  (task: TaskStateType, status: TaskStatus) =>
  async (dispatch: Dispatch): Promise<ActionType> => {
    try {
      if (!task) {
        return {
          error: "Task is required",
        };
      }

      if (task.status === "finished") {
        return {
          error: "Task is already finished",
        };
      }

      await db.update(tasks).set({ status }).where(eq(tasks.id, task.id));
      dispatch(setStatus({ id: task.id, status }));

      if (status === "finished") {
        dispatch(removeTask({ id: task.id }));
      }

      return { error: null };
    } catch (err) {
      console.error(err);
      const error = handleError(err, "Failed to change status");
      return { error };
    }
  };
