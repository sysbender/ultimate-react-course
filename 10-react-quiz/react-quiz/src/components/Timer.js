import { useEffect } from "react";

function Timer({ secondsLeft, dispatch }) {
  // timer
  useEffect(
    function () {
      const intervalId = setInterval(() => {
        dispatch({ type: "updateTimer" });
        console.log("======================= timer");
      }, 1000);
      console.log("=======================set timer");

      return () => {
        console.log("================clear timer");
        clearInterval(intervalId);
      };
    },
    [dispatch]
  );
  return <p className="timer">Seconds Left: {secondsLeft}</p>;
}

export default Timer;
