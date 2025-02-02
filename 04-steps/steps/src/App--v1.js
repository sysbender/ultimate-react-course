import { useState } from "react";
import DateCounter from "./DateCounter";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  //let step = 2;

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function handlerPrev() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
    console.log(step);
  }
  function handlerNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
    console.log(step);
  }
  return (
    <>
      <button
        onClick={() => {
          setIsOpen((b) => !b);
        }}
        className="close"
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}{" "}
          </p>

          <div className="buttons">
            <button
              onClick={handlerPrev}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              previous
            </button>
            <button
              onClick={handlerNext}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              next
            </button>
          </div>
        </div>
      )}
      <DateCounter />
    </>
  );
}
