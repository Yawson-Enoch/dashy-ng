import { withStorage } from '@larscom/ngrx-signals-storage';
import { computed } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { immerPatchState } from 'ngrx-immer/signals';
import { v4 as uuidv4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  description?: string;
  isEditing: boolean;
  isCompleted: boolean;
};

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    editDetails: computed(() => store.tasks().find((task) => task.isEditing)),
    totalTasks: computed(() => store.tasks().length),
    totalCompletedTasks: computed(
      () => store.tasks().filter((task) => task.isCompleted).length
    ),
  })),
  withMethods((store) => ({
    addTask(title: string, description: string) {
      immerPatchState(store, (state) => {
        state.tasks.push({
          id: uuidv4(),
          title,
          description,
          isEditing: false,
          isCompleted: false,
        });
      });
    },
    updateTask: (id: string, title: string, description: string) => {
      immerPatchState(store, (state) => {
        const task = state.tasks.find((task) => task.id === id);
        if (!task) return;
        task.title = title;
        task.description = description;
        task.isEditing = false;
      });
    },

    toggleCompleted: (id: string) => {
      immerPatchState(store, (state) => {
        const task = state.tasks.find((task) => task.id === id);
        if (!task) return;
        task.isCompleted = !task.isCompleted;
      });
    },
    editTask: (id: string) => {
      immerPatchState(store, (state) => {
        const task = state.tasks.find((task) => task.id === id);
        if (!task) return;
        task.isEditing = true;
      });
    },
    resetEditState: () => {
      immerPatchState(store, (state) => {
        state.tasks = state.tasks.map((task) => ({
          ...task,
          isEditing: false,
        }));
      });
    },
    deleteTask: (id: string) => {
      immerPatchState(store, (state) => {
        state.tasks = state.tasks.filter((task) => task.id !== id);
      });
    },
  })),
  withStorage('TASKS', localStorage)
);
