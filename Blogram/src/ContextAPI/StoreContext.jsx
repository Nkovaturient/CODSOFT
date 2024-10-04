import { signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider } from "../Pages/AuthGuard/firebase";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const[userData, setUserData]=useState({});
  const[email, setUserEmail]=useState(" ");
  const[blogIndex, setBlogIndex]=useState();
  const[feed, setFeed]=useState([]);
  const[newPostData, setNewPostData]=useState([]);
  const[view, setView]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const hideModal = () => setModalVisible(false);

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        setLoading(false);
        const user = result.user;
        const { email, refreshToken } = user;

        setToken(refreshToken || token);
        setUserEmail(email);

        console.log("user=", email);
        toast.success("Registered Successfully!", {
          position: "top-left",
          theme: "dark",
        });
        navigate("/");
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

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        setToken(localStorage.removeItem("token"));
        setUserData("");
        toast.success("Logged out!", { theme: "colored" });
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error(`${error.message}`, { theme: "colored" });
      });
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
    }
  }, [])

  const contextValue = {
    setLoading, loading,
    setNewPostData, newPostData,
    view, setView,
    modalVisible, setModalVisible, hideModal,
    handleGoogleSignIn, handleLogout,
    setFeed, feed,
    setToken,token,
    navigate,
    setBlogIndex, blogIndex,
    setUserData, userData,
    setUserEmail,email,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
