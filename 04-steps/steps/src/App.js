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

          <Message step={step}> {messages[step - 1]} </Message>

          <div className="buttons">
            {/* <button
              onClick={handlerPrev}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              previous
            </button> */}
            <Button
              textColor={"#fff"}
              bgColor={"#7950f2"}
              onClickHandler={handlerPrev}
            >
              <span>👈</span> Previous
            </Button>

            <Button
              textColor={"#fff"}
              bgColor={"#7950f2"}
              onClickHandler={handlerNext}
            >
              next<span>👉</span>{" "}
            </Button>

            {/* <button
              onClick={handlerNext}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              next
            </button> */}
          </div>
        </div>
      )}
      <DateCounter />
    </>
  );
}

function Button({ textColor, bgColor, onClickHandler, children }) {
  return (
    <button
      onClick={onClickHandler}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </button>
  );
}

function Message({ step, children }) {
  return (
    <p className="message">
      <h3>Step {step}:</h3>
      {children}
    </p>
  );
}
