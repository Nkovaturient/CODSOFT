import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Config  from '../../Config/Config.jsx'
import { StoreContext } from '../../ContextAPI/StoreContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSearch, faSpinner} from "@fortawesome/free-solid-svg-icons";
import FeedsCategory from '../../Components/FeedsCategory/FeedsCategory.jsx';
import './BlogFeeds.css'
import BlogFilter from '../../Components/BlogFilter/BlogFilter.jsx';

const BlogFeeds = () => {

    const url=`https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=${Config.BLOG_APIKEY}`;
    const {  setLoading, setFeed, feed } = useContext(StoreContext);
   

    useEffect(()=>{
        const retrieveBlog=async()=>{
            try {
                setLoading(true);
                const response=await axios.get(url);
                // console.log(response.data.items)
                setLoading(false);
    
                setFeed(response.data.items);
                
            } catch (e) {
                setLoading(false);
           console.log(e.message);
                
            }
        }
        retrieveBlog();
    }, [setFeed, setLoading])

  return (
    <>
    <div className="feeds-container">
        <div className="feeds-header">
            <h3>Take a stroll in the meadows of BlogFeed & enlighten yourself.</h3>
        </div>
        <div className="feeds-discover">
            <BlogFilter />
        </div>

        <FeedsCategory feed={feed} category={"Feeling Geeky?!"} />
    </div>
    </>
  )
}

export default BlogFeeds