import React from 'react'
import './ExploreBlog.css'

const ExploreBlog = () => {
  return (
    <>
    <div className="explore-container ">
      
    <div className="card mb-3" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src="/bg4.webp" className="img-fluid rounded-start" alt="blog1" />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Journey Through the Stars</h5>
        <p className="card-text">Explore the wonders of space with breathtaking images and stories from across the universe. Let your curiosity take flight.</p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
      
    
<div className="card mb-3" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src="/bg4.webp" className="img-fluid rounded-start" alt="blog2" />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Unlock Creative Minds</h5>
        <p className="card-text">Discover the stories behind the world's most inventive creators. Dive deep into their inspiring journeys and innovative ideas.</p>
        <p className="card-text"><small className="text-body-secondary">Last updated 5 mins ago</small></p>
      </div>
    </div>
  </div>
</div>

    </div>
    
    </>
  )
}

export default ExploreBlog