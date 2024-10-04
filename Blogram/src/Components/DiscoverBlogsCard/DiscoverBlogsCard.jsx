import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEdit, faExternalLinkAlt, faTags, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DiscoverBlogsCard.css'; 
import { Link } from 'react-router-dom';
import { StoreContext } from '../../ContextAPI/StoreContext';

const DiscoverBlogsCard = ({ id, title, author, published_at, blog_url, url, text, tags }) => {

  const{setModalVisible}=useContext(StoreContext);

  const showModal = () => setModalVisible(true);



  return (
    <div className="container my-3 d-flex justify-content-center">
      <div className="discover-card card shadow-sm">
        <div className="card-header bg-success text-white text-center">
          <h5 className="card-title">{title}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted my-3">
            <FontAwesomeIcon icon={faUser} /> {author} <br />
            <FontAwesomeIcon icon={faCalendarAlt} /> {new Date(published_at).toLocaleDateString()}
          </h6>
          <p className="card-text">
            { text}
          </p>
          {tags && tags.length > 0 && (
            <p className="tags">
              <FontAwesomeIcon icon={faTags} />{' '}
              {tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">{tag}</span>
              ))}
            </p>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between">
          {
            url ? <a href={url} className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
            Read Full Post <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
          : <Link to={`/blog/edit/${id}`} className="btn btn-warning">Edit <FontAwesomeIcon icon={faEdit}/></Link>
          }
          {
            blog_url ? <a href={blog_url} className="btn btn-outline-secondary" target="_blank" rel="noopener noreferrer">
            Visit Blog <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
          : <Link to={`/blog/delete/${id}`} className="btn btn-danger">Delete <FontAwesomeIcon icon={faTrash}/></Link>

          }
        </div>
      </div>
    </div>
  );
};

export default DiscoverBlogsCard;
