import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../ContextAPI/ContextAPI";
import QuizCardList from '../QuizWindow/QuizCardList'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const TakeQuiz = () => {
  const { setQuiz, navigate, loading, setLoading } = useContext(StoreContext);

  const [data, setData] = useState({
    questions: 10,
    category: " ",
    difficulty: " ",
    type: " ",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  let url = `https://opentdb.com/api.php`;

  const handleQuizData = async (e) => {
    e.preventDefault();
    let newUrl = url;

    const params = {
      amount: data.questions,
      category: data.category,
      difficulty: data.difficulty,
      type: data.type,
    };

    if (
      params.category !== " " &&
      params.difficulty === " " &&
      params.type === " "
    ) {
      newUrl = `${url}?amount=${params.amount}&category=${params.category}`;
    } else if (
      params.difficulty !== " " &&
      params.category === " " &&
      params.type === " "
    ) {
      newUrl = `${url}?amount=${params.amount}&difficulty=${params.difficulty}`;
    } else if (
      params.type !== " " &&
      params.difficulty === " " &&
      params.category === " "
    ) {
      newUrl = `${url}?amount=${params.amount}&type=${params.type}`;
    } else if (
      params.category !== " " &&
      params.difficulty !== " " &&
      params.type !== " "
    ) {
      newUrl = `${url}?amount=${params.amount}&category=${params.category}&difficulty=${params.difficulty}&type=${params.type}`;
    } else if (
      params.category === " " &&
      params.type === " " &&
      params.difficulty === " "
    ) {
      newUrl = `${url}?amount=${params.amount}`;
    }

    try {
      setLoading(true);
      const response = await axios.get(newUrl);
      setLoading(false);
     if(response.data.results){
      setQuiz(response.data.results);
      // console.log('response=', response.data.results);
      toast.info("All the best!", {
        position: "top-left",
        theme: "colored",
      });
      navigate("/quiz/live");

     } else {
      setLoading(false);
      toast.error("No quiz data!", {
        position: "top-left",
        theme: "colored",
      });
      navigate("/quiz/take");
     }
      
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "top-left",
        theme: "colored",
      });
    }
  };


  return (
    <>
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Assess yourself</h1>

        <form
          className="flex-col space-y-6 take-form"
          onSubmit={handleQuizData}
        >
          <div className="add-quiz-name ">
            <label className="block text-lg font-medium">Questions</label>
            <input
              className="w-full mt-1 p-2 border rounded-md"
              onChange={handleOnChange}
              value={data.questions}
              type="text"
              name="questions"
              placeholder="total questions.."
              required
            />
          </div>

          <div className="add-quiz-name flex-col">
            <label htmlFor="category" className="block text-lg font-medium">
              Category*
            </label>
            <select  name="category"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={handleOnChange}
              value={data.category}
            >
              <option value=" ">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment:books</option>
              <option value="11">Film</option>
              <option value="12">Music</option>
              <option value="13">Musicals & Theatres</option>
              <option value="14">Television</option>
              <option value="15">Video games</option>
              <option value="16">Board Games</option>
              <option value="17">Science & Nature</option>
              <option value="18">Computer</option>
              <option value="19">Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Comics</option>
              <option value="30">Science Gadgets</option>
              <option value="31">Japanese Anime & Manga</option>
              <option value="32">Cartoon and Animations</option>
            </select>
          </div>

          <div className="add-quiz-description flex-col">
            <label htmlFor="difficulty" className="block text-lg font-medium">
              Difficulty
            </label>
            <select
              name="difficulty"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={handleOnChange}
              value={data.difficulty}
            >
              <option value=" ">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="add-quiz-description flex-col">
            <label htmlFor="type" className="block text-lg font-medium">
              Type
            </label>
            <select
              name="type"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={handleOnChange}
              value={data.type}
            >
              <option value=" ">Any Type</option>
              <option value="multiple">Multiple Choice Questions</option>
              <option value="boolean">True & False</option>
            </select>
          </div>

          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
          {loading? <FontAwesomeIcon icon={faSpinner} /> : 'Start Quiz'}
          </button>
        </form>
      </div>
      <br /><hr /><br />
      <QuizCardList />
    </>
  );
};

export default TakeQuiz;
