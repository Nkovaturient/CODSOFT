import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../ContextAPI/StoreContext'
import FeedsCard from '../../Components/FeedsCard';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCompass, faNavicon } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const MyBlogs = () => {
    const{newPostData,navigate,token, setNewPostData}=useContext(StoreContext);

    useEffect(()=>{
      if(!token){
        toast.error(`You must register to view your blog history!`, {theme: 'dark'})
        navigate("/user/login");
      }
    }, [])
    
  return (
   <>
   <div className="my-blog-wrapper d-flex justify-content-between flex-wrap">
    <div className="title">
    <h3>My Blogs</h3>
    </div>
    <div className="actions">
    <Link to={"/blog/create"} className="btn btn-outline-success">Create <FontAwesomeIcon  icon={faAdd}/></Link>
    <Link to={"/blog/discover"} className="btn btn-outline-info">Discover <FontAwesomeIcon  icon={faCompass}/></Link>
    </div>
  
   </div>
   
   {newPostData.length > 0 && (
          <div className="my-blogs mt-5">
            
            {newPostData.map((post, index) => (
              <FeedsCard key={index}
              id={post.id}
               title={post.title}
                description={post.description}
                 author={post.author} 
                 update={(post.last_updated)?.split("T")[0]} />
            ))}
          </div>
        )}
   </>
  )
}

export default MyBlogs