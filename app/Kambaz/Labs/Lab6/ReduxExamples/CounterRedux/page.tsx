"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";

export default function CounterRedux() {
  const { count } = useSelector((state: any) => state.counterReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-counter-redux">
      <h4>Counter Redux</h4>
      <h5>{count}</h5>
      <button 
        onClick={() => dispatch(increment())}
        className="btn btn-success me-2"
        id="wd-counter-redux-increment-click"
      >
        Increment
      </button>
      <button 
        onClick={() => dispatch(decrement())}
        className="btn btn-danger"
        id="wd-counter-redux-decrement-click"
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}