import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../Lab6/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../Lab6/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Lab6/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../Lab6/ReduxExamples/todos/todosReducer";

const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
  },
});

export default store;