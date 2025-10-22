"use client";

import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();

  return (
    <li className="list-group-item" key={todo.id}>
      <button 
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="btn btn-danger btn-sm me-2"
        id="wd-delete-todo-click"
      >
        Delete
      </button>
      <button 
        onClick={() => dispatch(setTodo(todo))}
        className="btn btn-primary btn-sm me-2"
        id="wd-set-todo-click"
      >
        Edit
      </button>
      {todo.title}
    </li>
  );
}