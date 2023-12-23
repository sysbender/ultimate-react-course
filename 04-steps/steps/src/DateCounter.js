import { useState } from "react";
export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [today, setToday] = useState(calculateDate(0));

  function calculateDate(offset) {
    const currentDate = new Date();
    const updateDate = new Date(currentDate);
    updateDate.setDate(currentDate.getDate() + offset);

    return updateDate.toDateString();
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setStep((v) => v - 1);
            setToday(calculateDate(step * count));
          }}
        >
          -
        </button>
        <span>Step:{step}</span>
        <button
          onClick={() => {
            setStep((v) => v + 1);
            setToday(calculateDate(step * count));
          }}
        >
          -
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setCount((v) => v - 1);
            setToday(calculateDate(step * count));
          }}
        >
          -
        </button>
        <span>Count:{count}</span>
        <button
          onClick={() => {
            setCount((v) => v + 1);
            setToday(calculateDate(step * count));
          }}
        >
          +
        </button>
      </div>
      <p> Today is:{today} </p>
    </div>
  );
}
