import React, { lazy, Suspense } from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import CreateBlog from './Pages/CreateBlog/CreateBlog'
import Home from './Pages/Home/Home'
import RenderBlog from './Pages/RenderBlog/RenderBlog'
import Signup from './Pages/AuthGuard/Signup'
import Login from './Pages/AuthGuard/Login'
import ScrollToTop from './Components/ScrollToTop'
import EditBlog from './Pages/EditBlog/EditBlog'
// const Home=lazy(()=> import('./Pages/Home/Home'))
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import BlogFeeds from './Pages/BlogFeeds/BlogFeeds'
import DiscoverBlogs from './Pages/DiscoverBlogs/DiscoverBlogs'
import MyBlogs from './Pages/MyBlogs/MyBlogs'
import DeleteBlog from './Pages/DeleteBlog/DeleteBlog'

const App = () => {
  return (
   <>
   <ToastContainer />
   <div className="app">
   <Navbar /> 
   <ScrollToTop />
   <Routes>
     <Route path='/' element={<Home />} /> 
     <Route path='/blog/create' element={<CreateBlog />} /> 
     <Route path='/blog/feeds' element={<BlogFeeds />} /> 
     <Route path='/blog/discover' element={<DiscoverBlogs />} /> 
    <Route path='/blog/personal' element={<MyBlogs/>}/>
     <Route path='/blog/:id' element={<RenderBlog />} /> 
     <Route path='/blog/edit/:id' element={<EditBlog />} /> 
     <Route path='/blog/delete/:id' element={<DeleteBlog />} /> 
     <Route path='/user/signup' element={<Signup />} />
     <Route path='/user/login' element={<Login />} />
   </Routes>
   <Footer />
   </div>
   
   
   </>
  )
}

const LoadingVideo = () => {
  return (
    <div className="video-container">
      <video className="video-preview" autoPlay muted loop>
        <source src="./loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default App