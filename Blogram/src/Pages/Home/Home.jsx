import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../Components/Hero/Hero";
import ExploreBlog from "../../Components/ExploreBlog/ExploreBlog";
import SampleBlog from "../../Components/SampleBlog/SampleBlog";

const Home = () => {
  return (
    <div className="home">
    <Hero/>
    <ExploreBlog/>
    <SampleBlog />
    </div>
  );
};

export default Home;
