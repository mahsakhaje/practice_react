import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useState} from'react';
import { fetchQuestions } from "../gameSlice";
import Card from '@mui/material//Card';
import { useNavigate } from "react-router-dom";

export default function Game() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.game);
  const [currentIndex, setCurrentIndex] = useState(0);
  let navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const loading = response.fetchingQuestions;
  const error = response.errorMessage;
  const questions = response.qList;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
console.log(questions);
  return (
    <div>
        <Card style={{ margin: 20 ,padding:10}} key={questions[currentIndex].id} >
          
          
          <Question
        
            key={questions[currentIndex].id}
            question={questions[currentIndex].question}
            options={questions[currentIndex].incorrect_answers}
            correctOption={questions[currentIndex].correct_answer}
          /> 

         
        </Card>
    </div>
  );

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
      if(selectedOption === correctOption){
        setCurrentIndex(currentIndex + 1)
      }else{
       localStorage.setItem('lastScore',currentIndex);
       navigate("/play");

      }
    };
  
    var options1=Array.from(options.values());
    options1.push(correctOption);
    options1=shuffle(options1);
  
    console.log(options1);
  return (
    <div>
      <p style={{ margin: 8,color:'blue'}}>{question}</p>
      {options1.map((option, index) => (
          <div>
        <button
  
          key={index}
          disabled={answer !== null}
          onClick={() => checkAnswer(option)}
        >
          {index+1}_{option}
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
}
