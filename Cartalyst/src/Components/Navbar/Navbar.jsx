import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../ContextApi/ContextApi'
import { useSnackbar } from 'notistack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartShopping, faContactBook, faHistory, faHomeAlt } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const{cartItem, orderHistory}=useContext(StoreContext);
  const[cartActive, setCartActive]=useState(false);
  const {enqueueSnackbar }=useSnackbar();
 
  useEffect(()=>{
    if (Object.keys(cartItem).length > 0) {
      setCartActive(true);  
    } else {
      setCartActive(false); 
    }

  },[cartItem])

  return (
    <nav className="navbar navbar-expand-lg sticky-top ">
  <div className="container-fluid ">
  <Link className="navbar-brand" to={'/'}>
      <img src="/logo.jpg" alt="Logo"  className="d-inline-block align-text-top" />
    </Link>
    <button className="navbar-toggler" type="button" 
    data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="nav-menu collapse navbar-collapse" id="navbarNavAltMarkup">
    <ul className="nav justify-content-center mx-auto">
  <Link className="nav-item" to={'/'}>
   <FontAwesomeIcon icon={faHomeAlt} />
  </Link>
  <Link className="nav-item cart-icon" to={'/cart'}>
    {cartActive ? <FontAwesomeIcon icon={faCartShopping} /> : "Cart"}
  </Link>
 
    <a className="nav-item " href="#footer"><FontAwesomeIcon icon={faContactBook} /></a>
    {orderHistory &&
    <Link className="nav-item cart-icon" to={'/cart/history'}>
      <FontAwesomeIcon icon={faHistory} /> 
  </Link>
}
</ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar