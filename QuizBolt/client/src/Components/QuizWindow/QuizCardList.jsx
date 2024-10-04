import QuizCardItem from "./QuizCardItem";
import { quizzes } from "../../Data/Data";
import { useContext } from "react";
import { StoreContext } from "../../ContextAPI/ContextAPI";

const QuizCardList = () => {

  const{token, navigate}=useContext(StoreContext);

   
    return (
      <>
       <button className="create mx-4 my-4 mx-4 p-4 bg-yellow-600 rounded hover:bg-indigo-500"
        onClick={() => navigate("/quiz/dashboard")}>
                My QuizMania
              </button>
     
      <div className="flex flex-wrap justify-center mx-8">

        {quizzes.map((quiz, index) => (
          <QuizCardItem
            key={index}
            title={quiz.title}
            category={quiz.category}
            description={quiz.description}
            difficulty={quiz.difficulty}
          />
        ))}
      </div>
      </>
    );
}

export default QuizCardList;