import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizCountdown = ({ quizTitle, quizLink, handleQuizApi }) => {
  const [countdown, setCountdown] = useState(5); // Countdown starts from 5 seconds
  const navigate = useNavigate();

  useEffect(() => {
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1050);
      return () => clearTimeout(timer); // Clean up the timer on unmount
    } else {
      handleQuizApi();
      navigate(quizLink); // Navigate to the quiz page after countdown
    }
  }, [countdown, navigate, quizLink]);

  return (
    <div className="countdown-container h-96 mt-4 flex flex-col items-center rounded-xl shadow-xl justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <h1 className="text-4xl font-bold mb-6 animate-pulse">
        {quizTitle}
      </h1>
      <div className="flex items-center justify-center space-x-4 text-center">
        <p className="text-9xl font-extrabold">{countdown}</p>
      </div>
      <p className="mt-4 text-lg opacity-75">Get ready for the quiz!</p>
    </div>
  );
};

export default QuizCountdown;
