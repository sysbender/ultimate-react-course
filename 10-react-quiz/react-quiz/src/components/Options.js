function Options({ question, handleNewAnswer, answer }) {
  const isAnswered = answer !== null;
  const isWrong = answer !== question.correctOption;
  return (
    <div>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${index === question.correctOption ? "correct" : ""}

          ${
            answer !== question.correctOption && index === answer ? "wrong" : ""
          }
          `}
          disabled={answer !== null}
          key={option}
          onClick={() => {
            const newAnswerAction = { type: "newAnswer", payload: index };
            console.log(newAnswerAction);
            handleNewAnswer(newAnswerAction);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
