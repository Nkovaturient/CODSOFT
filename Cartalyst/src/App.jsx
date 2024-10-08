import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './pages/Home/Home'
import './index.css'
import Cart from './pages/Cart/Cart'
import ScrollToTop from './Components/ScrollToTop'
import CartHistory from './Components/CartHistory'

const App = () => {
  return (
    <>  
    <div className="app">
    <Navbar />
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/cart/history' element={<CartHistory />} />
    </Routes>
    
    </div>
    <Footer />
    </>
  )
}

export default App