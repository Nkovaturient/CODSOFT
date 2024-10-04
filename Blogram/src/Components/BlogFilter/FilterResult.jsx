import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../BlogCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../ContextAPI/StoreContext'

const FilterResult = ({error, searchResults, currentPage}) => {

    const{loading}=useContext(StoreContext);
    
  return (
    <>
     <div className="blog-results">
        {loading && <p>Loading <FontAwesomeIcon icon={faSpinner} spinPulse/></p>}
        {error && <p>{error}</p>}
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={result.id} 
            className={currentPage === index ? ' mt-5 my-5 blog-discover-card' : 'hide-discover-card' }>
              <BlogCard id={result.id} title={result.title} 
              content={(result.text).substring(0, 150) + '...'} 
              author={result.author}
              update={(result.published_at).split('T')[0]} />
              <br />
              <div className="render-operation">
        <Link to={`/blog/${result.id}`} className="btn btn-warning">
          Read more
        </Link>
      </div>
              <hr />
            </div>
           
          ))
        ) : (
          <p>{" "}</p>
        )}
      </div>
    </>
  )
}

export default FilterResult