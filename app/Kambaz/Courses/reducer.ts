/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, action) => {
      state.courses = [...state.courses, action.payload] as any;
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((course: any) => course._id !== action.payload);
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((course: any) =>
        course._id === action.payload._id ? action.payload : course
      ) as any;
    },
  },
});

export const { setCourses, addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;