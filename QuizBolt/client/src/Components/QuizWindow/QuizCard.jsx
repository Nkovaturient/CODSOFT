import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../ContextAPI/ContextAPI";
// import "./QuizWindow.css";
import Spinner from "../Spinner";

const QuizCard = () => {
  const { quiz, setAnswers, answers, navigate, loading } =
    useContext(StoreContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // console.log("Submitted answers:", answers);
    navigate("/quiz/result");
  };

  const handlePrevious = (indx) => {
    setCurrentIndex(indx - 1);
  };
  const handleNext = (indx) => {
    setCurrentIndex(indx + 1);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Take the Quiz</h1>

          <form className="space-y-8 take-form" onSubmit={handleSubmit}>
            {quiz.map((question, index) => {
              const options =
                question.answers && typeof question.answers === "object"
                  ? Object.entries(question.answers)
                      .filter(([key, value]) => value)
                      .map(([key, value]) => value)
                  : 0;

              return (
                <div key={index} className="p-8 border rounded-md shadow-md">
                  <h2 className="text-xl font-semibold mb-2">
                    <b className="text-blue-600">{index + 1}.</b>{" "}
                    {question.question}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 my-4">
                    Category: {question.category || ' '} | Difficulty:{" "}
                    {question.difficulty || ' '}
                  </p>

                  {/* Render option for multiple choice questions */}
                  {question.type === "multiple" && (
                    <div className="space-y-2">
                      {[...question.incorrect_answers, question.correct_answer]
                        .sort()
                        .map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="block p-2  border rounded-md cursor-pointer hover:bg-yellow-500"
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              onChange={() => handleAnswerChange(index, option)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                    </div>
                  )}

                  {/* quiziz api */}
                  <div className="space-y-2">
                    {options.length > 0 &&
                      options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="block p-2 border rounded-md cursor-pointer hover:bg-yellow-500"
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            onChange={() => handleAnswerChange(index, option)}
                            className="mr-2"
                            required
                          />
                          {option}
                        </label>
                      ))}
                  </div>

                  {/* Render options for boolean questions */}
                  {question.type === "boolean" && (
                    <div className="space-y-2">
                      {["True", "False"].map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="block p-2  border rounded-md cursor-pointer hover:bg-yellow-500"
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            onChange={() => handleAnswerChange(index, option)}
                            className="mr-2"
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              className="w-full bg-yellow-500 text-2xl-white py-4 px-4 rounded-md hover:bg-pink-700"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default QuizCard;
