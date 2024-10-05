import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce'; 
import './BlogFilter.css';
import Config from '../../Config/Config';
import { StoreContext } from '../../ContextAPI/StoreContext';
import FilterResult from './FilterResult';

const BlogFilter = () => {
  const{setLoading}=useContext(StoreContext);

  const [searchQuery, setSearchQuery] = useState('physics');
  const [sort, setSort] = useState('published');
  const [sortOrder, setSortOrder] = useState('desc');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0); 
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0); 

  const API_KEY = Config.TWINGLY_API; 
  const baseURL = import.meta.env.MODE === 'production'
    ? 'https://api.twingly.com'  
    : '/api';  


  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}/blog/search/api/v3/search`, {
        params: {
          apikey: API_KEY,
          q: `${searchQuery} sort:${sort} sort-order:${sortOrder} page-size:${pageSize}`,
          format: 'json',
        },
      });

      if (response.data) {
        console.log(response.data);
        setSearchResults(response.data.documents);
        setTotalResults(response.data.number_of_matches_returned); 
        toast.success('Blogs fetched successfully!', { theme: 'colored' });
      } else {
        toast.info('No results found', { theme: 'dark' });
      }
    } catch (err) {
      setError('Failed to fetch blogs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(()=>{
  //   console.log(searchQuery, '--', sortOrder, '--', pageSize, '--', sort)
  //   console.log(currentPage);
  //   console.log(totalResults);
  // }, [searchQuery, sortOrder, pageSize, sort, currentPage])



  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 100), 
    []
  );

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage !== totalResults) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && currentPage <= totalResults) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className='container my-3'>

      <div className="container my-3">
  <div className="feeds-search-area input-group mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search your interest..."
      value={searchQuery}
      onChange={(e) => debouncedSearch(e.target.value)}
    />
    <button onClick={handleSearch} className="btn btn-primary">
      🔍
    </button>
  </div>

  <div className="filters d-flex flex-wrap gap-3 align-items-center mb-4">
    <div className="filter-item">
      <label className="form-label">Sort By:</label>
      <select
        className="form-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="published">Published</option>
        <option value="created">Created</option>
        <option value="inlinks">Inlinks</option>
        <option value="twinglyrank">Twinglyrank</option>
      </select>
    </div>

    <div className="filter-item">
      <label className="form-label">Sort Order:</label>
      <select
        className="form-select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <div className="filter-item">
      <label className="form-label">Page Size:</label>
      <input
        type="number"
        className="form-control"
        value={pageSize}
        min="1"
        onChange={(e) => setPageSize(e.target.value)}
      />
    </div>
  </div>
</div>


     <FilterResult searchResults={searchResults} error={error} currentPage={currentPage} />

      {
        totalResults !== 0 && <div className="pagination-controls">
        <button
          disabled={currentPage === 0}
          onClick={() => handlePageChange('prev')}
        >
          Previous
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage === totalResults - 1}
          onClick={() => handlePageChange('next')}
        >
          Next
        </button>
      </div> 
      }

    </div>
  );
};

export default BlogFilter;
