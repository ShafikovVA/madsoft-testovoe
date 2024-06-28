import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnswerType } from '../../types/AnswerType';

const localItems = localStorage.getItem('answer');

export const answerSlice = createSlice({
  name: 'answers',
  initialState: localItems ? JSON.parse(localItems) as AnswerType[] : [] as AnswerType[],
  reducers: {
    addAnswer: (state, { payload: answer }: PayloadAction<AnswerType>) => {
      state.push(answer);
      localStorage.setItem('answer', JSON.stringify(state));
    },
  },
});

export const { actions, reducer } = answerSlice;

export const { addAnswer } = actions;
