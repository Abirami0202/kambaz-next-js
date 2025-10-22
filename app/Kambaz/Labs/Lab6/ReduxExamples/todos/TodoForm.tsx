/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <li className="list-group-item">
      <button 
        onClick={() => dispatch(addTodo(todo))}
        className="btn btn-success me-2"
        id="wd-add-todo-click"
      >
        Add
      </button>
      <button 
        onClick={() => dispatch(updateTodo(todo))}
        className="btn btn-warning me-2"
        id="wd-update-todo-click"
      >
        Update
      </button>
      <input
        className="form-control w-50 d-inline-block"
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </li>
  );
}