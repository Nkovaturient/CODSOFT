import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { auth } from "../Components/AuthGuard/firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

export const StoreContext = createContext(null);

const StoreContextProvider= (props)=>{
    const[quiz, setQuiz]=useState([]); //opentdb
    const[quiziz, setQuiziz]=useState([]); //quiz api db
    const[quizCreatedCard, setQuizCreatedCard]=useState([]);
    const[loading, setLoading]=useState(false);
    const navigate=useNavigate();
    const[userData, setUserData]=useState({});
    const[token, setToken]=useState(" ");
    const [answers, setAnswers] = useState({});

    const handleLogout=async()=>{
        await signOut(auth).then(() => {
            
             setToken(localStorage.removeItem("token"));
              setTimeout(() => {
                toast.success('Logged out successfully', {
                    position: "top-left",
                    theme: "colored"
                  });
                  navigate("/");
              }, 1050);
          }).catch((error) => {
            toast.error(`${error.message}`, {
              position: "top-left",
              autoClose: 5000,
              theme: "dark",
            });
          });

    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
        }
    }, [token])

    const contextValue={
        setQuiz, quiz,
        setQuiziz, quiziz,
        quizCreatedCard, setQuizCreatedCard,
        navigate,
        loading, setLoading,
        token, setToken,
        setUserData, userData,
        handleLogout,
        answers, setAnswers,
    }


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}

        </StoreContext.Provider>
    )

}

export default StoreContextProvider

