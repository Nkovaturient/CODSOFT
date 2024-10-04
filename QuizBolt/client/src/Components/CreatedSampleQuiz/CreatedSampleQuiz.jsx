import React, { useContext, useState, useEffect } from 'react'
import QuizCardItem from '../QuizWindow/QuizCardItem'
import { StoreContext } from '../../ContextAPI/ContextAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const CreatedSampleQuiz = () => {
    const{quizCreatedCard,navigate, setQuizCreatedCard}=useContext(StoreContext);

    useEffect(() => {
        const retrieve=localStorage.getItem("quizData");
        if(retrieve){
            setQuizCreatedCard(JSON.parse(retrieve));
        }
        
    }, [setQuizCreatedCard])
    

  return (
    <>
    <div className="created-quiz-container mt-8 my-8 mx-8">
        <div className="created-quiz-heading text-center">
            <h2 className='text-4xl text-bold'>My QuizMania</h2>
        </div>
        <div className="created-quiz-actions">
        <button className="create mx-4 my-4 mx-4 p-4 bg-yellow-600 rounded hover:bg-indigo-500"
        onClick={() => navigate("/quiz/create")}>
                Create <FontAwesomeIcon icon={faAdd} />
              </button>
              <button className="create mx-4 my-4 mx-4 p-4 bg-yellow-600 rounded hover:bg-indigo-500"
        onClick={() => navigate("/quiz/take")}>
                Participate <FontAwesomeIcon icon={faCheckCircle} />
              </button>
        </div>
        <div className="created-quiz-content flex flex-wrap mx-8 my-4">
        {quizCreatedCard.length > 0 ? (
          quizCreatedCard.map((quiz, index) => (
            <QuizCardItem
            key={index}
            title={quiz[index].title}
            category={quiz[index].category}
            description={quiz[index].description}
            difficulty={quiz[index].difficulty}
            total={quiz[index].total}
          />
          ))
        ) : (
            <div className="h-14 w-full mt-8 text-center text-4xl text-bold bg-gradient-to-r from-violet-500 to-fuchsia-500">No quiz created yet.</div>
          
        )}
        </div>

    </div>
    </>
  )
}

export default CreatedSampleQuiz