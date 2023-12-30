function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  return index + 1 < numQuestions ? (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  ) : (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
      Finish
    </button>
  );
}

export default NextButton;
