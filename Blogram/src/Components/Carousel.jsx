import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../ContextAPI/StoreContext';

const Carousel = () => {
  
  const { loading, setLoading, feed } = useContext(StoreContext);

  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide border border-success" 
    style={{width: '70vw', height: '450px'}}
    data-bs-ride="carousel">
   
      <div className="carousel-indicators">
        {feed.map((post, index) => (
          <button
            key={post.id}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner mb-3">
        {feed.map((post, index) => (
          <div key={post.id} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="10000">
            <img
              src={post.author.image ? post.author.image.url : '/future.jpg'}
              className="d-block w-100"
              style={{width: '290px', height: '350px'}}
              alt={post.title}
            />

            <div className="carousel-caption d-none d-md-block">
              <h5>{post.title}</h5>
              <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) + '...' }}></p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
