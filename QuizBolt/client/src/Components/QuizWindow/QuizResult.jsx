import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../ContextAPI/ContextAPI';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import QuizShare from './QuizShare';

const QuizResult = () => {
  const { quiz, answers, navigate } = useContext(StoreContext);
  const [showAnswer, setShowAnswer] = useState(false);
  const { width, height } = useWindowSize();
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const totalQuestions = quiz.length;


  const calcPercent = (scored, total) => {
    return Math.round((scored / total) * 100);
  };

 
  const handleScore = () => {
    let correctAnswers = 0;
    
    quiz.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correctAnswers += 1;
      }
    });

    const finalPercentage = calcPercent(correctAnswers, totalQuestions);
    setScore(correctAnswers);
    setPercentage(finalPercentage);
  };


  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  useEffect(()=>{
    handleScore();
  }, [])

  return (
    <>
    <div className="quiz-results-container ">
       
        
          <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Your Results</h1>
            {
              percentage == 0 || percentage <=20
              ? <p className="text-xl mt-4">
              You scored {score} out of {totalQuestions} ({percentage}% ) 
              Dont lose your hope. Try again till you strike a bolt! 😇
            </p>
            : <p className="text-xl mt-4">
            Hurrayy! Perfect Bolt! ⚡ You scored {score} out of {totalQuestions} ({percentage}% 🏆) 
          </p>
            }

            {percentage >= 50 && <Confetti width={width} height={height} />}
            <br />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 mr-4 hover:bg-indigo-700"
              onClick={() => navigate('/quiz/take')}
            >
              Play Again
            </button>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-700"
              onClick={() => navigate('/quiz/create')}
            >
              Create your own Quiz 
            </button>

            <div>
              <QuizShare quizResult={score} />
            </div>
          </div>
       
      </div>

      {!showAnswer ? (
          <button
            onClick={handleShowAnswer}
            className="bg-blue-600 mt-4 p-4 mr-4 text-white px-4 py-2 rounded-md"
          >
            Show Answer Key
          </button>
        ) : (
      <div className="mt-8 my-4 mx-8  text-center p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-4">Quiz Answer Key</h2>
        {quiz.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">
              {index + 1}. {question.question}
            </h3>
            <p>
              Your answer:{" "}
              <span className={answers[index] === question.correct_answer 
                ? "text-green-600" 
                : "text-red-600"}>
                {answers[index]}
              </span>
            </p>
            <p className='text-bold text-white-500'>
              Correct answer: <b>{question.correct_answer}</b>
            </p>
          </div>
        ))}
      </div>
       )}
    </>
  );
};

export default QuizResult;






