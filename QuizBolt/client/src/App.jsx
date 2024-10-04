import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/Home/HomePage'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import CreateQuizForm from './Components/CreateQuizForm/CreateQuizForm';
import TakeQuiz from './Components/TakeQuiz/TakeQuiz';
import QuizWindow from './Components/QuizWindow/QuizWindow';
import Navbar from './Components/Navbar';
import Signup from './Components/AuthGuard/Signup';
import Footer from './Components/Footer';
import Login from './Components/AuthGuard/Login';
import QuizResult from './Components/QuizWindow/QuizResult';
import ScrollToTop from './Components/ScrollToTop';
import PageNotFound from './Components/PageNotFound';
import CreatedSampleQuiz from './Components/CreatedSampleQuiz/CreatedSampleQuiz';

const App = () => {
  return (
    <>
    <ToastContainer />
      <Navbar/>
      <ScrollToTop/>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/quiz/create' element={<CreateQuizForm />} />
      <Route path='/quiz/take' element={<TakeQuiz />} />
      <Route path='/quiz/live' element={<QuizWindow />} />
      <Route path='/quiz/result' element={<QuizResult />} />
      <Route path='/quiz/dashboard' element={<CreatedSampleQuiz />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>

    <Footer/>
    </>
  )
}

export default App