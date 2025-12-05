/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
  _id: string;
  quiz: string;
  title: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank";
  points: number;
  question: string;
  choices?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswer?: boolean;
}

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions = [...state.questions, action.payload];
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      state.questions = state.questions.map((question) =>
        question._id === action.payload._id ? action.payload : question
      );
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = questionsSlice.actions;

export default questionsSlice.reducer;