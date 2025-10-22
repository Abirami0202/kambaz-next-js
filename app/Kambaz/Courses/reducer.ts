/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";

const initialState = {
  courses: initialCourses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const newCourse = {
        ...action.payload,
        _id: new Date().getTime().toString(),
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((course: any) => course._id !== action.payload);
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((course: any) =>
        course._id === action.payload._id ? action.payload : course
      );
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;