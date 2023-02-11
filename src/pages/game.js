import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuestions } from "../gameSlice";
import Question from "../question.js";
export default function Game() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.game);


  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const loading = response.fetchingQuestions;
  const error = response.errorMessage;
  const questions = response.qList;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 
  return (
    <div>
      {questions.map((question) => (
        <div style={{ margin: 20 }} key={question.id}>
          
          
          <Question
            key={question.id}
            question={question.question}
            options={question.incorrect_answers}
            correctOption={question.correct_answer}
          /> 
        
         
        </div>
      ))}
    </div>
  );
}
