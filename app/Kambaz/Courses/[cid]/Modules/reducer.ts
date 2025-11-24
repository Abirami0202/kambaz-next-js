/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons: any[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, action: PayloadAction<Module>) => {
      state.modules = [...state.modules, action.payload];
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload._id ? action.payload : module
      );
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload ? { ...module, editing: true } : module
      );
    },
    addLesson: (state, action: PayloadAction<{ moduleId: string; lessonName: string }>) => {
      const { moduleId, lessonName } = action.payload;
      state.modules = state.modules.map((module) => {
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
    deleteLesson: (state, action: PayloadAction<{ moduleId: string; lessonId: string }>) => {
      const { moduleId, lessonId } = action.payload;
      state.modules = state.modules.map((module) => {
        if (module._id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.filter((lesson: any) => lesson._id !== lessonId),
          };
        }
        return module;
      });
    },
    updateLesson: (state, action: PayloadAction<{ moduleId: string; lesson: any }>) => {
      const { moduleId, lesson } = action.payload;
      state.modules = state.modules.map((module) => {
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
    editLesson: (state, action: PayloadAction<{ moduleId: string; lessonId: string }>) => {
      const { moduleId, lessonId } = action.payload;
      state.modules = state.modules.map((module) => {
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