import React, { useEffect } from 'react'
import './Footer.css'

const Footer = () => {

    const handleScroll=()=>{
        window.scrollTo(0, 0);
    }

  return (
    <div className='footer' id='footer'>
        <hr />
        <div className="footer-content">
            <div className="footer-content-left">
                <img src="/logo.png" alt="logo" style={{width: '320px'}} />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eveniet mollitia dolor, accusantium exercitationem reiciendis magni. Doloremque praesentium ut, veniam mollitia ea dolorum qui atque consequuntur pariatur vitae laboriosam quod!</p>
                <div className="footer-social-icons">
                    <img src=" " alt="fb" />
                    <img src=" " alt="linked" />
                    <img src=" " alt="twitter" />
                </div>
                
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
                <div className="footer-scroll offset-2">
                    <button onClick={handleScroll} className='btn btn-outline-warning'>Back to Top</button>
                </div>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1 254641254</li>
                    <li>email@Blogram.com</li>
                </ul>
                <br />
               
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &copy; Blogram.com - All Rights Reserved.</p>

    </div>
  )
}

export default Footer