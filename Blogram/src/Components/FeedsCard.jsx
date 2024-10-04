import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../ContextAPI/StoreContext'

const FeedsCard = ({id, author, title, update, description }) => {
  const{setView}=useContext(StoreContext);
  return (
   <>

   <div className="card feeds-card border-success mb-3">
  <div className="card-header bg-transparent border-success">{author}</div>
  <div className="card-body text-success">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{(description)?.substring(0, 250) + '...'}</p>
    <Link to={`/blog/${id}`} className="btn btn-warning" onClick={() => setView(true)}>Read more</Link>
  </div>
  <div className="card-footer bg-transparent border-success">{update}</div>
</div>

   </>
  )
}

export default FeedsCard