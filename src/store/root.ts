import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as TaskReducer } from './tasks/tasks.slice';
import { reducer as AnswersReducer } from './answers/answers.slice';
import { reducer as AnswerReducer } from './answer/answer.slice';

const reducers = combineReducers({
  tasks: TaskReducer,
  answers: AnswersReducer,
  answer: AnswerReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
