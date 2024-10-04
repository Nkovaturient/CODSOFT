import React, { useContext } from 'react'
import { useState } from 'react';
import { blogData} from '../../Data/BlogData';
import { useEffect } from 'react';
import BlogCard from '../../Components/BlogCard';
import {Link, useParams} from 'react-router-dom'
import { StoreContext } from '../../ContextAPI/StoreContext';
import axios from 'axios';
import Config from '../../Config/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import DiscoverBlogsCard from '../../Components/DiscoverBlogsCard/DiscoverBlogsCard';

const RenderBlog = () => {

  const {setBlogIndex, newPostData, setLoading, loading, blogIndex, setView, view}=useContext(StoreContext);
  const[postData, setPostData]=useState();
  const[discoverData, setDiscoverData]=useState([]);
  const { id } = useParams();

  useEffect(() => {
    setBlogIndex(id);

    const getPost = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`https://www.googleapis.com/blogger/v3/blogs/2399953/posts/${id}?key=${Config.BLOG_APIKEY}`);
    
        if (response.data) {
          setPostData(response.data);
          // toast.success("Blog data fetched from Google Blogger API!", { position: "top-left", theme: "colored" });
        }

      } catch (error) {
        console.error("Error fetching from Google Blogger API:", error.message);
        
        try {
          const twinglyResponse = await axios.get('/api/blog/search/api/v3/search', {
            params: {
              apikey: Config.TWINGLY_API,
              q: `id:${id}`,
              format: 'json',
            },
          });

          if (twinglyResponse.data.number_of_matches_returned !== 0) {
            // console.log(twinglyResponse.data);
            setDiscoverData(twinglyResponse.data.documents);
            // toast.success("Blog data fetched from Twingly API!", { position: "top-left", theme: "colored" });
          }

        } catch (twinglyError) {
          console.error("Error fetching from Twingly API:", twinglyError.message);
          // toast.error("Failed to fetch blog data from both APIs.", { position: "top-left", theme: "dark" });
        }
      } finally {
        setLoading(false);
        setView(true);
      }
    };

    getPost();
  }, [id, setBlogIndex, setLoading]);



  return (
    <>
     <div className="render">

      {/* Render from blogData if blogIndex matches */}
      {blogData && blogData.some((data) => blogIndex === data.id) ? (
        blogData.map((data, index) => (
          blogIndex === data.id && (
            <div key={index}>
              <BlogCard
                title={data.title}
                content={data.content}
                description={data.description}
                author={data.author}
                update={data.last_updated}
                img={data.image_url}
              />
            </div>
          )
        ))
      ) : (
        <div className="render-feed-cards g-blogger">
         
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          ) : (
            postData && (
              <BlogCard
                key={postData.id}
                title={postData.title}
                url={postData.url}
                author={postData.author?.displayName? postData.author.displayName : 'Unknown'}
                update={(postData.updated || '').split('T')[0]} 
                img={postData.author?.image? postData.author.image.url : '/bg4.webp'}
              />
            )
          )}
        </div>
      )}

      <div className="render-feed-cards query-results">
      {loading ? (
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          ) : (
           discoverData && discoverData.length > 0 && 
            <DiscoverBlogsCard 
            author={discoverData[0].author}
            url={discoverData[0].url}
            blog_url={discoverData[0].blog_url}
            text={discoverData[0].text}
            tags={discoverData[0].tags}
            published_at={discoverData[0].published_at}
            title={discoverData[0].title}   />
          )}
      </div>

      <div className="render-personal-blogs">
        {
          view && newPostData.length > 0 && newPostData.map((post, index)=>{
            return <div key={index} className={ blogIndex === post.id ? "my-blogs" : "hide-blog"}>
               
              <DiscoverBlogsCard 
              id={id}
            author={post.author}
            text={post.description}
            tags={post.tags}
            published_at={post.last_updated}
            title={post.title}   />
            </div>
          })
        }
      </div>
    </div>
    </>
  )
}

export default RenderBlog