import { createSlice } from '@reduxjs/toolkit';
import { initialTasks } from './initialTasks';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialTasks,
  reducers: {},
});

export const { actions, reducer } = taskSlice;
