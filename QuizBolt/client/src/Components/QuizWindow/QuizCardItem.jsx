import React, { useContext, useEffect, useState } from "react";
import QuizCountdown from "../QuizCountdown";
import { toast } from "react-toastify";
import { StoreContext } from "../../ContextAPI/ContextAPI";
import axios from "axios";
import { Config } from "../../Config/Config";
import { createdsamplequiz } from "../../Data/Data";

const QuizCardItem = ({ title, category, description, difficulty, total }) => {
  const { setQuiz, setLoading, quizCreatedCard } = useContext(StoreContext);
  const [startQuiz, setStartQuiz] = useState(false);

  const link = "/quiz/live";

  const handleQuizApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://quizapi.io/api/v1/questions`, {
        params: {
          apiKey: Config.VITE_API_KEY,
          limit: 10,
          category: category,
          difficulty: difficulty,
        },
      });
      
      setLoading(false);
      setQuiz(response.data);
  
    } catch (e) {
      setLoading(false);
      
      //setQuiz(quizCreatedCard); 
      const flattenedQuiz = quizCreatedCard.flat(); 
      setQuiz(flattenedQuiz); 
      
      toast.info(`Good Luck not Liquid Luck!`, {
        position: "top-left",
        theme: "dark",
      });
    }
  };
  

  const handleQuizStart = (e) => {
    setStartQuiz(true);
  };

  return (
    <>
      {startQuiz ? (
        <QuizCountdown
          quizTitle={title}
          quizLink={link}
          handleQuizApi={handleQuizApi}
        />
      ) : (
        <>
          <div className="quiz-card-container flex flex-wrap justify-center gap-8 p-4 mt-6">
            <div className="quiz-card relative bg-white w-80 h-96 p-6 rounded-xl shadow-xl transform transition-all hover:scale-105 hover:-translate-y-3  duration-300 ">
              <div
                className={`absolute top-4 right-4 py-1 px-3 rounded-lg text-white shadow-md ${
                  difficulty === "easy"
                    ? "bg-green-500"
                    : difficulty === "medium"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {difficulty || 'hard'}
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-0  transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900">{title || 'Example Card'}</h3>
                <span className="text-gray-600 italic mb-2 inline-block mb-4">
                  Category: {category || 'random'}
                </span>
                <p className="text-gray-700 mt-4">{description || 'Description of Quiz'}</p>
                <p className="absolute top-11 right-1 py-1 px-4 rounded-lg text-white shadow-md bg-purple-700 ">Total: {total || 10}</p>
              </div>

              <button
                onClick={handleQuizStart}
                className="absolute mt-8 py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-md  transition duration-300"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuizCardItem;
