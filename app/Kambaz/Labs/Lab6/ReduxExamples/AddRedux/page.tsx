/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";

export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const { sum } = useSelector((state: any) => state.addReducer);
  const dispatch = useDispatch();

  return (
    <div className="w-50" id="wd-add-redux">
      <h4>Add Redux</h4>
      <h5>{a} + {b} = {sum}</h5>
      <input
        type="number"
        className="form-control mb-2"
        value={a}
        onChange={(e) => setA(parseInt(e.target.value))}
      />
      <input
        type="number"
        className="form-control mb-2"
        value={b}
        onChange={(e) => setB(parseInt(e.target.value))}
      />
      <button 
        className="btn btn-primary"
        onClick={() => dispatch(add({ a, b }))}
        id="wd-add-redux-click"
      >
        Add Redux
      </button>
      <hr />
    </div>
  );
}