import { createSlice } from '@reduxjs/toolkit';
import { initialTasks } from './initialTasks';
import { ITaskData } from '../../types/ITaskData';

const localItems = localStorage.getItem('answer');
const initialTasksLocal: ITaskData = localItems ? {
  tasks: initialTasks.tasks,
  timer: JSON.parse(localItems),
} : initialTasks;

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksLocal,
  reducers: {},
});

export const { actions, reducer } = taskSlice;
