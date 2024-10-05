import React from 'react'
import FadeInSection from '../FadeInSection'

const VideoStream = ({  productName, description, img, learnMore}) => {
  return (
    <FadeInSection >
    <div className='container mt-60' id='#explore'>
      <div className="row mt-8 flex gap-40 flex-wrap ">
         <div className="col-4" style={{ width: '450px', height: '350px'}}>
          <iframe src="./video.webm" style={{ width: '100%', height: '100%'}} ></iframe>
        </div>
        <div className="col-2"></div>
        <div className="col-6 p-5 mt-5 content">
          <h1 className='mb-4'>{productName}</h1>
          <p className='text-2xl'>{description}</p>
          <div>
          <a style={{color: '#ffaa00'}} href='#'>Try Demo <i className="fa-solid fa-arrow-right"></i></a>
          <a style={{color: '#ffaa00', marginLeft: '50px'}} href={learnMore}>Learn More <i className="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
    </FadeInSection>
  )
}

export default VideoStream