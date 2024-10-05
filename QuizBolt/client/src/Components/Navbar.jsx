import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FadeInSection from "./FadeInSection";
import { StoreContext } from "../ContextAPI/ContextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { token, handleLogout } = useContext(StoreContext);

  return (
    <>
      <FadeInSection>
        <div className="navbar text-3xl text-bold flex justify-evenly p-4">
          <div className="navbar-left flex gap-4">
            <h4 className="text-6xl nav-item">Quiz</h4>
            <img src="/logo1.png" alt="QuizBolt" className="header-logo" />
          </div>

          <ul className={`navbar-menu text-center flex gap-20 py-4`}>
            <Link to="/">Home</Link>
            <Link to="/quiz/create">
              Quizwizard <FontAwesomeIcon icon={faWandMagicSparkles} />
            </Link>
            <Link to="/quiz/dashboard">
              QuizMania <FontAwesomeIcon icon={faQuestionCircle} />
            </Link>
          </ul>

          <div className="navbar-right mx-8 my-4">
            {token ? (
              <button className="mr-4 nav-item" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="mr-4 nav-item">
                <Link to="/signup">Sign Up</Link>
              </button>
            )}
          </div>
        </div>
      </FadeInSection>
    </>
  );
};

export default Navbar;
