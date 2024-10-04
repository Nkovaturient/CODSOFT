import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({title, content, url, id, update, img, description, author}) => {
  

  return (
    <div className="card border-success mb-3 mt-4"  >
  <div className="row g-0">
    <div className="col-md-4">
      <img className="img-fluid rounded-start" src={img ? img : "/bg4.webp"}  alt="blog img" />
    </div>
    <div className="col-md-8">
    <div className="card-header bg-danger text-white">
          <h5 className="card-title">{title}</h5>
        </div>
      <div className="card-body">
        <p className="card-text">{content}</p>
        <p className="card-text">{description}</p>
        { url && <a href={url} target='_blank'>View Google Blog <FontAwesomeIcon icon={faEye} /></a>}
        <br />
        <p className="card-text"><small className="text-body-secondary">{update}</small></p>
      </div>
      <div className="card-footer bg-transparent border-success">{author || ' '}</div>
    
    </div>

  </div>
</div>
  )
}

export default BlogCard