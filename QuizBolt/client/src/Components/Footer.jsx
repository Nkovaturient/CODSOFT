import React from 'react'

const Footer = () => {
  return (
    <div className='footer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src='/footer.jpg' alt="logo" style={{width: '320px'}} />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eveniet mollitia dolor, accusantium exercitationem reiciendis magni. Doloremque praesentium ut, veniam mollitia ea dolorum qui atque consequuntur pariatur vitae laboriosam quod!</p>
               
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1 254641254</li>
                    <li>email@quizbolt.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &copy; QuizBolt.com - All Rights Reserved.</p>

    </div>
  )
}

export default Footer