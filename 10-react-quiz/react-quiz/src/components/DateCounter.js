import { useState, useReducer } from "react";

function reducer(state, action) {
  console.log({ state, action });
  const newState = { ...state };

  switch (action.type) {
    case "inc":
      newState.count += action.payload;
      break;
    case "dec":
      newState.count -= action.payload;
      break;
    case "setCount":
      newState.count = action.payload;
      break;

    case "setStep":
      newState.step = action.payload;
      break;
    case "reset":
      newState.step = 1;
      newState.count = 0;
      break;
    default:
      throw new Error("Action type not supported");
  }

  return newState;

  // return state + action;
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  const initalState = { count: 0, step: 1 };

  const [state, dispatch] = useReducer(reducer, initalState);
  const { count, step } = state;

  // const [step, setStep] = useState(1);

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
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    //setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "reset" });
    // setStep(1);
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
