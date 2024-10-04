import React from 'react'
import FadeInSection from '../FadeInSection'

const Features = ({ productName, description, img, learnMore}) => {
  return (
    <FadeInSection>
    <div className="container mt-8" id='features'>
    <div className="row flex gap-60 flex-wrap">
      <div className="col-6 p-5 mt-5 content">
        <h1 className="mb-4">{productName}</h1>
        <p className="text-muted text-2xl">{description}</p>
        <div>
          <a style={{ color: "#ffaa00" }} href={learnMore}>
            Learn More <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div className="col-4 image">
        <img src={img} alt={productName} style={{width: '350px'}} />
      </div>
    </div>
  </div>
  </FadeInSection>
  )
}

export default Features