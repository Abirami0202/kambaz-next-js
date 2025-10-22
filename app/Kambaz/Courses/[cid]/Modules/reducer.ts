import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../Database";

const initialState = {
  modules: db.modules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      const newModule = {
        ...action.payload,
        _id: new Date().getTime().toString(),
        lessons: [],
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module: any) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module: any) =>
        module._id === action.payload._id ? action.payload : module
      );
    },
    editModule: (state, action) => {
      state.modules = state.modules.map((module: any) =>
        module._id === action.payload ? { ...module, editing: true } : module
      );
    },
    // NEW: Lesson actions
    addLesson: (state, action) => {
      const { moduleId, lessonName } = action.payload;
      state.modules = state.modules.map((module: any) => {
        if (module._id === moduleId) {
          const newLesson = {
            _id: new Date().getTime().toString(),
            name: lessonName,
            module: moduleId,
          };
          return {
            ...module,
            lessons: [...(module.lessons || []), newLesson],
          };
        }
        return module;
      });
    },
    deleteLesson: (state, action) => {
      const { moduleId, lessonId } = action.payload;
      state.modules = state.modules.map((module: any) => {
        if (module._id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.filter((lesson: any) => lesson._id !== lessonId),
          };
        }
        return module;
      });
    },
    updateLesson: (state, action) => {
      const { moduleId, lesson } = action.payload;
      state.modules = state.modules.map((module: any) => {
        if (module._id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map((l: any) =>
              l._id === lesson._id ? lesson : l
            ),
          };
        }
        return module;
      });
    },
    editLesson: (state, action) => {
      const { moduleId, lessonId } = action.payload;
      state.modules = state.modules.map((module: any) => {
        if (module._id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map((lesson: any) =>
              lesson._id === lessonId ? { ...lesson, editing: true } : lesson
            ),
          };
        }
        return module;
      });
    },
  },
});

export const { 
  setModules, 
  addModule, 
  deleteModule, 
  updateModule, 
  editModule,
  addLesson,
  deleteLesson,
  updateLesson,
  editLesson
} = modulesSlice.actions;

export default modulesSlice.reducer;