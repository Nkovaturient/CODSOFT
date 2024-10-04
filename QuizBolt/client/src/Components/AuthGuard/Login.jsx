import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { StoreContext } from "../../ContextAPI/ContextAPI";
import Spinner from "../Spinner";
import { auth } from "./firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    
    const {url, loading, setUserData, setLoading, navigate}=useContext(StoreContext);

    const [inputValue, setInputValue] = useState({
      email: "",
      password: "",
    });

    const { email, password } = inputValue;

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });
    };

    const handleLogin=async(e)=>{
      e.preventDefault();

      const userEmail=inputValue.email;
      const userPassword=inputValue.password;

      setLoading(true);
      await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        setLoading(false);
          const user = userCredential.user;
        
          const{email, accessToken}=user;
          localStorage.setItem("token", accessToken);
          setUserData(email);
        
          toast.success(`Welcome back-${email.split('@')[0]}!`, {
            position: "top-left",
            theme: "colored"
          });
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
      })
      .catch((error) => {
        setLoading(false);
          toast.error(`${error.message}`, {
            position: "top-left",
            autoClose: 5000,
            theme: "dark",
          });
      });
    }

  
    return (
        <div className="signup-page">
      <div className="form_container">
        <h2>Login here</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">{loading? <FontAwesomeIcon icon={faSpinner} /> : 'Submit'}</button>
          <span>
            Already have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
      </div>
      </div>
    );
  };
  
  export default Login;