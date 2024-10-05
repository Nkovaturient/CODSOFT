import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Features from "../Features/Features";
import VideoStream from "../Features/videoStream.jsx";
import { StoreContext } from "../../ContextAPI/ContextAPI";
import { toast } from "react-toastify";

const HomePage = () => {

  const{token, navigate}=useContext(StoreContext);

  const handleClick=(e)=>{
    const name=e.target.className;

    if(!token){
      toast.warning(`Kindly login to proceed!`, {
        position: "top-left",
        theme: "dark",
      });
      navigate('/login');
    }  else {
      if(name === 'create'){
        navigate('/quiz/create');
      } else{
        navigate('/quiz/take');
      }
      
    }
  }

  return (
    <>
      <div className="home-container">
       
        <div className="hero-section">
          <div className="hero-content" style={{lineHeight: '1.2cm'}}>
            <h3>Strike a thunderbolt score- Unleash Your Inner Quiz Master! </h3>
            
            <p>QuizBolt is your ultimate hub for effortless quiz creation, sharing, and practice. Whether you're mastering trivia, creating custom challenges, or competing with friends, QuizBolt makes it fun, fast, and intuitive. Dive in, sharpen your skills, and share your success—all in just a few clicks!" </p>
            
              <button className="create" onClick={ handleClick}>
                Create a Quiz
              </button>
            
            <button className="take" onClick={handleClick}>
              Take a Quiz
            </button>
          </div>
          <div className="hero-img">
            <img src="./img6.avif" id="img1" alt="hero-img" />
          </div> 
        </div>
      </div>

      <div className="features-container mt-20 my-4 " id="features">
      
      <Features
        img={"./img2.png"}
        productName={"Kite"}
        description={
          "Create, Share, and Dominate Quizzes Effortlessly.Challenge Yourself, Test Your Friends, and Level Up Your Knowledge — All in One Place! Our ultra-fast flagship  platform with  advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        }
      />
      
     <VideoStream
        img={"./img5.jpg"}
        productName={"Console"}
        description={
          "The central dashboard for your quiziz phase. Gain insights into your concepts and information with in-depth reports and visualisations."
        }
      />
     
      </div>
    </>
  );
};

export default HomePage;
