import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Create. Read. Enlighten. — Where Your Words Ignite Conversations.</h2>
        <p>
          Dive into a world where creating, sharing, and discovering blogs is as
          seamless as reading your favorite stories. Whether you're crafting the
          next viral post or exploring new perspectives, Blogram is here to make
          blogging intuitive, fun, and shareable at the click of a button.
          Unleash your thoughts, connect with readers, and watch your words
          spark conversations!
        </p>
        <a href="#explore-blog" className="view-btn">
          Explore Blogram
        </a>
      </div>
    </div>
  );
};

export default Hero;
