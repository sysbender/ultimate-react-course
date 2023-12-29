import { useState, useReducer } from "react";

function reducer(state, action) {
  console.log({ state, action });

  switch (action.type) {
    case "inc":
      return state + action.payload;
    case "dec":
      return state - action.payload;
    case "set":
      return action.payload;
    default:
      throw new Error("Action type not supported");
  }

  // return state + action;
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);

  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: "dec", payload: step });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "set", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "set", payload: 0 });
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
