/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Attempt {
  _id: string;
  quiz: string;
  user: string;
  course: string;
  attemptNumber: number;
  score: number;
  answers: Array<{
    question: string;
    answer: any;
  }>;
  submittedAt: string;
}

interface AttemptsState {
  attempts: Attempt[];
  latestAttempt: Attempt | null;
}

const initialState: AttemptsState = {
  attempts: [],
  latestAttempt: null,
};

const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {
    setAttempts: (state, action: PayloadAction<Attempt[]>) => {
      state.attempts = action.payload;
    },
    setLatestAttempt: (state, action: PayloadAction<Attempt | null>) => {
      state.latestAttempt = action.payload;
    },
    addAttempt: (state, action: PayloadAction<Attempt>) => {
      state.attempts = [action.payload, ...state.attempts];
      state.latestAttempt = action.payload;
    },
  },
});

export const {
  setAttempts,
  setLatestAttempt,
  addAttempt,
} = attemptsSlice.actions;

export default attemptsSlice.reducer;