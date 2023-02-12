import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useState} from'react';
import { fetchQuestions, selectQuestions } from "../features/game/gameSlice";
import Card from "@mui/material//Card";
import { useNavigate } from "react-router-dom";

export default function Game() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const response = useSelector((state) => state.game);
  console.log({ response });

  const error = useSelector((s) => s.game.error);
  const questions = useSelector(selectQuestions);
  const status = useSelector((s) => s.game.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuestions({ number: 3 }));
    }
  }, [dispatch, status]);

  if (status === "idle" || status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error}</div>;

  return (
    <div>
      <Card style={{ margin: 20, padding: 10 }} key={2}>
        <Question
          question={questions[currentIndex]?.question}
          options={questions[currentIndex].incorrect_answers}
          correctOption={questions[currentIndex].correct_answer}
        />
      </Card>
    </div>
  );

  function Question({ question, options, correctOption }) {
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
      if (selectedOption === correctOption) {
        setCurrentIndex(currentIndex + 1);
      } else {
        localStorage.setItem("lastScore", currentIndex);
        navigate("/play");
      }
    };

    var options1 = Array.from(options.values());
    options1.push(correctOption);
    options1 = shuffle(options1);

    console.log(options1);
    return (
      <div>
        <p style={{ margin: 8, color: "blue" }}>{question}</p>
        {options1.map((option, index) => (
          <div key={index}>
            <button disabled={answer !== null} onClick={() => checkAnswer(option)}>
              {index + 1}_{option}
            </button>
            <br />
          </div>
        ))}
        {answer !== null && (
          <p>
            {selectedAnswer} is : {completed ? "Correct" : "Incorrect"}
          </p>
        )}
      </div>
    );
  }
}
