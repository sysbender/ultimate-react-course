import { useEffect, useState, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  endSeconds: 0,
  secondsLeft: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      // set endTime and timeLeft
      const duration = 10 * state.questions.length;
      const endSeconds = Math.ceil(new Date().getTime() / 1000 + duration);
      return { ...state, status: "active", endSeconds, secondsLeft: duration };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const answer = action.payload;

      const newPoints =
        answer === question.correctOption
          ? state.points + question.points
          : state.points;

      return { ...state, answer: action.payload, points: newPoints };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };

    case "finish":
      const newHighScore = Math.max(state.points, state.highScore);
      return { ...state, status: "finished", highScore: newHighScore };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        highScore: 0,
        answer: null,
        points: 0,
      };

    case "updateTimer":
      const currentSeconds = Math.ceil(new Date().getTime() / 1000);
      if (currentSeconds >= state.endSeconds) {
        const newHighScore = Math.max(state.points, state.highScore);
        return { ...state, status: "finished", highScore: newHighScore };
      } else {
        const secondsLeft = state.endSeconds - currentSeconds;
        return { ...state, secondsLeft };
      }

    default:
      const msg = `Action type is not valid ${action.type}`;
      console.log(msg);
      throw new Error(msg);
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      endSeconds,
      secondsLeft,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((previous, current, idx) => {
    return previous + current.points;
  }, 0);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const url = "http://localhost:8000/questions";
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.length);
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.error("failed fetch questions : ", err.message);
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsLeft={secondsLeft} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
