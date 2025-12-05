import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../Courses/reducer";
import modulesReducer from "../Courses/[cid]/Modules/reducer";
import assignmentsReducer from "../Courses/[cid]/Assignments/reducer";
import accountReducer from "../Account/reducer";
import quizzesReducer from "../Courses/[cid]/Quizzes/reducer";
import questionsReducer from "../Courses/[cid]/Quizzes/Questions/reducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    assignmentsReducer,
    accountReducer,
    quizzesReducer,
    questionsReducer,
  },
});

export default store;