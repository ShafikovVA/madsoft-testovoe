import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnswerType } from '../../types/AnswerType';

export const answerSlice = createSlice({
  name: 'answer',
  initialState: null as AnswerType | null,
  reducers: {
    setAnswer: (_, { payload: answer }: PayloadAction<AnswerType | null>) => (answer),
  },
});

export const { actions, reducer } = answerSlice;

export const { setAnswer } = actions;
