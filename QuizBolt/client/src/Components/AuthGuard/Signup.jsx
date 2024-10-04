import React, { useContext, useState } from 'react'
import { StoreContext } from '../../ContextAPI/ContextAPI'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faSpinner, faThunderstorm } from '@fortawesome/free-solid-svg-icons';
import { auth } from './firebase';

const Signup = () => {
  const{loading, setLoading, navigate, setUserData, setToken}=useContext(StoreContext)
  
  const [inp, setInp] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(inp, name, "--", value);
    setInp({ ...inp, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = inp.email;
    const userPassword = inp.password;

    setLoading(true);
    await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        setLoading(false);

        const user=userCredential.user;
        const {email, accessToken}=user;
        setUserData(email);
        localStorage.setItem('token', accessToken);
        
        toast.success("Registered Successfully!", {
          position: "top-left",
          theme: "colored",
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
  };
  
  
  
  
  return (
    <div className="signup-page">
      <div className="form_container">
       
        <form onSubmit={handleSubmit}>
        <h2 className="text-center text-3xl "> Signup to Quiz<FontAwesomeIcon icon={faBoltLightning} /></h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={inp.email}
              placeholder="your email &"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={inp.username}
              placeholder="your good name"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={inp.password}
              placeholder="with a strong password"
              onChange={handleOnChange}
              required
            />
          </div>
          <button type="submit">{loading? <FontAwesomeIcon icon={faSpinner} /> : 'Register'}</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Signup