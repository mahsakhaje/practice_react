import React, { useState } from 'react';

function Question  ({ question, options, correctOption })  {
  const [answer, setAnswer] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const checkAnswer = (selectedOption) => {
      setSelectedAnswer(selectedOption);
    setAnswer(selectedOption);
    setCompleted(selectedOption === correctOption);
  };

  var options1=Array.from(options.values());
  options1.push(correctOption);
  options1=shuffle(options1);

  console.log(options1);
return (
  <div>
    <p>{question}</p>
    {options1.map((option, index) => (
        <div>
      <button

        key={index}
        disabled={answer !== null}
        onClick={() => checkAnswer(option)}
      >
        {option}
      </button>
      <br/>
      </div>
    ))}
    {answer !== null && (
      <p>
        {selectedAnswer} is : {completed ? 'Correct' : 'Incorrect'}
      </p>
    )}
  </div>
);
};
export default Question;
