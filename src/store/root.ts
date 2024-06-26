import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as TaskReducer } from './tasks/tasks.slice';
import { reducer as AnswerReducer } from './answers/answers.slice';

const reducers = combineReducers({
  tasks: TaskReducer,
  answers: AnswerReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
