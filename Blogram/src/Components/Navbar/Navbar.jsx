import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../ContextAPI/StoreContext";

const Navbar = () => {

 const{navigate, email, token, handleLogout}=useContext(StoreContext);

  return (
    <div className="navbar-container  mx-4  px-4 py-3 ">
      <div className=" navbar-item d-flex justify-content-evenly flex-wrap">
        <button
          type="button"
          className="btn btn-outline-info"
        >
          { token && email ? email : "Subscribe"}
        </button>

        <h1 className="text-center">
          <img src="/logo.png" alt="logo" width="90" height="60" />
          logram
        </h1>
        {
          token 
          ? <button
          type="button"
          onClick={ handleLogout}
          className="btn btn-outline-warning"
        >
          Logout
        </button>
        : <button
        type="button"
        onClick={() => navigate("/user/signup")}
        className="btn btn-outline-warning"
      >
        Sign up
      </button>
        }
      </div>

      <hr />
      <ul className="nav justify-content-center">
        <Link className="nav-link " to={"/"}>
          Home
        </Link>
        <Link className="nav-link" to={"/blog/create"}>
          Create your Blog
        </Link>
        <Link className="nav-link" to={"/blog/feeds"}>
          BlogFeeds
        </Link>
        { token && <Link className="nav-link" to={"/blog/personal"}>
          My Blogs
        </Link>}
        <li className="nav-item" >
          <a className="nav-link" href="#footer">
            Contact us
          </a>
        </li>
      </ul>

      <hr />
    </div>
  );
};

export default Navbar;
