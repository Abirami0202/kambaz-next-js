"use client";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples/page";

export default function Lab6() {
  // Function to pass to PassingFunctions component
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab6" className="container">
      <h2>Lab 6 - State Management</h2>
      
      {/* Section 1: User Events */}
      <div className="mb-5">
        <h3 className="text-primary">Section 1: User Events</h3>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <EventObject />
      </div>

      {/* Section 2: Component State */}
      <div className="mb-5">
        <h3 className="text-primary">Section 2: Component State</h3>
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
      </div>

      {/* Section 3: Redux */}
      <div className="mb-5">
        <h3 className="text-primary">Section 3: Redux Application State</h3>
        <ReduxExamples />
      </div>
    </div>
  );
}