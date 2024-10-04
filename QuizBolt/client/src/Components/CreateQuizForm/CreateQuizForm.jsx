import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../ContextAPI/ContextAPI.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CreateQuizForm = () => {
  const {
    token,
    setLoading,
    loading,
    navigate,
    setQuizCreatedCard,
    quizCreatedCard,
  } = useContext(StoreContext);

  const [quizData, setQuizData] = useState({
    title: "",
    category: "",
    difficulty: "easy",
    totalQuestions: 5,
    description: " ",
    questions: [
      {
        type: "multiple",
        question: "",
        incorrect_answers: ["", "", ""],
        correct_answer: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index][key] = value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleIncorrectAnswerChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...quizData.questions];
    const newIncorrectAnswers = [
      ...newQuestions[questionIndex].incorrect_answers,
    ];
    newIncorrectAnswers[optionIndex] = value;
    newQuestions[questionIndex].incorrect_answers = newIncorrectAnswers;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          type: "multiple",
          question: "",
          incorrect_answers: ["", "", ""],
          correct_answer: "",
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = quizData.questions.filter(
      (_, qIndex) => qIndex !== index
    );
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizmaniaData = {
      title: quizData.title,
      category: quizData.category,
      difficulty: quizData.difficulty,
      total: quizData.totalQuestions,
      description: quizData.description,
      question: quizData.questions.map((data) => ({
        type: data.type,
        question: data.question,
        incorrect_answers: data.incorrect_answers,
        correct_answer: data.correct_answer,
      })),
    };

    const formattedQuizData = quizmaniaData.question.map((q) => ({
      title: quizmaniaData.title,
      category: quizmaniaData.category,
      difficulty: quizmaniaData.difficulty,
      description: quizmaniaData.description,
      total: quizmaniaData.total,
      type: q.type,
      question: q.question,
      incorrect_answers: q.incorrect_answers,
      correct_answer: q.correct_answer,
    }));

    setLoading(true);
    const existingQuizzes =
      (await JSON.parse(localStorage.getItem("quizData"))) || [];
    const updatedQuizzes = [...existingQuizzes, formattedQuizData];
    localStorage.setItem("quizData", JSON.stringify(updatedQuizzes));

    await setQuizCreatedCard(updatedQuizzes);
    setLoading(false);

    setTimeout(() => {
      navigate("/quiz/dashboard");
    }, 1000);

    try {
      toast.info(`Your Quiz is ready`, {
        position: "top-left",
        theme: "colored",
      });
    } catch (err) {
      setLoading(false);
      toast.error(`${err.message}`, {
        position: "top-left",
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Kindly Login to proceed!", { theme: "dark" });
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Create a New Quiz</h1>
      <form onSubmit={handleSubmit} className=" create-form space-y-6">
        <div>
          <label className="block text-lg font-medium">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={quizData.category}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Description</label>
          <input
            type="text"
            name="description" // Fixed name from "category" to "description"
            placeholder="A short description on what your quiz is all about.."
            value={quizData.description}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Difficulty Level</label>
          <select
            name="difficulty"
            value={quizData.difficulty}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium">Total Questions</label>
          <input
            type="number"
            name="totalQuestions"
            value={quizData.totalQuestions}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
            min="1"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Questions</h2>
          {quizData.questions.map((question, index) => (
            <div key={index} className="p-4 border rounded-md mt-4">
              <div>
                <label className="block text-lg font-medium">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-lg font-medium">
                  Question Type
                </label>
                <select
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionChange(index, "type", e.target.value)
                  }
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True/False</option>
                </select>
              </div>

              {question.type === "multiple" && (
                <div className="mt-4 space-y-2">
                  {question.incorrect_answers.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <label className="block">
                        Incorrect Option {optionIndex + 1}
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleIncorrectAnswerChange(
                            index,
                            optionIndex,
                            e.target.value
                          )
                        }
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>
                  ))}

                  <div className="mt-2">
                    <label className="block">Correct Option</label>
                    <input
                      type="text"
                      value={question.correct_answer}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "correct_answer",
                          e.target.value
                        )
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
              )}

              {question.type === "boolean" && (
                <div className="mt-4">
                  <label className="block">Correct Answer</label>
                  <select
                    value={question.correct_answer}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correct_answer",
                        e.target.value
                      )
                    }
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Remove Question
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add New Question
        </button>

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuizForm;
