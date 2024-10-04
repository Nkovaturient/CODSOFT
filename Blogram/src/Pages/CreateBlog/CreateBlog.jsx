import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Badge } from 'react-bootstrap';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import './CreateBlog.css';
import {toast} from 'react-toastify'
import BlogCard from '../../Components/BlogCard';
import { StoreContext } from '../../ContextAPI/StoreContext';
import { faSpinner, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CreateBlog = () => {

  const{setNewPostData, newPostData, token, navigate, loading, setLoading}=useContext(StoreContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [preview, setPreview]=useState(false);
  const [previewBlogData, setPreviewBlogData]=useState(null);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    } else {
      setError('Please select a valid image file');
    }
  };

  const generateRandomId = () => {
    return Date.now().toString() + Math.floor(Math.random() * 1000000).toString();
  };

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputTag.trim())) {
        setTags([...tags, inputTag.trim()]);
      }
      setInputTag('');  
    }
  };


  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  
  const handlePreview = async (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      setError('⚠Title and body cannot be empty⚠');
      return;
    }

    const newPost = {
      id : generateRandomId(),
      title,
      description,
      tags,
      author,
      image,
      last_updated: new Date().toISOString(),
    };

    await setPreviewBlogData(newPost);
    // console.log('Blog post previewed:', previewBlogData);
      setPreview(true);
      toast.success("Your Blog is ready to be published!🎉");
  };

  const handleSubmit=(e)=>{

   const retrieveData = JSON.parse(localStorage.getItem("Blogs")) || [];

  const updatedBlogs = [...retrieveData, previewBlogData];

  localStorage.setItem("Blogs", JSON.stringify(updatedBlogs));
  setNewPostData(updatedBlogs); 
  toast.success("Blog Published Successfully!!🎉", {theme: 'dark'});

    setLoading(true);
    setTimeout(() => {
     
navigate("/blog/personal");
    }, 1000);
    setLoading(false);

  }
 
  useEffect(()=>{
    if(!token){
      toast.error("You must be registered to create a blog!", {theme: "dark"});
      navigate("/user/login");
    }

  }, [token]);

  return (
    <>
    <div className="new-blog-wrapper">
    <Container className=" write-blog mt-5">
      <h2>Create New Blog</h2>
      {error && <p className="text-warning">{error}</p>}
      <Form onSubmit={handlePreview}>
        <Form.Group controlId="blogTitle">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="The Uncanny Encounter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blogDescription" className="mt-3">
          <Form.Label>Body</Form.Label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            // style={{ minHeight: '300px', maxHeight: '600px', overflowY: 'auto' }}
            placeholder="Raining heavily, the windows shattering against the walls, the speedy winds howling through the corridors as I was lying on my bed with a book regreting to not have gone with my parents to the town carnival, some 25km away. Then, suddenly..."
          />
        </Form.Group>

        <Form.Group controlId="blogTags" className="mt-5">
          <Form.Label>Tags (press Enter to add):</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags..."
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyPress={handleKeyPress}  
          />
        </Form.Group>
        {tags.length > 0 && (
          <div className="tags mt-3">
            <FontAwesomeIcon icon={faTags} className="me-2" />
            {tags.map((tag, index) => (
              <Badge key={index} bg="dark" className="me-1">
                {tag}{' '}
                <span
                  onClick={() => removeTag(tag)}
                  style={{ cursor: 'pointer' }}
                >
                  &times;
                </span>
              </Badge>
            ))}
          </div>
        )}

        <Form.Group controlId="blogAuthor" className='mt-5'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your good name.."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        

        <Form.Group controlId="blogImage" className="mt-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
        </Form.Group>

        {image && (
          <div className="mt-3 text-center">
            <img src={image} alt="Uploaded" className="img-fluid blog-image-preview" />
          </div>
        )}

        <Button variant="primary" type="submit" className="mt-4">
          Preview Blog
        </Button>
      </Form>
    </Container>

    {preview && previewBlogData && (
          <div className="preview-blog mt-5 mx-5 p-5">
            <h3>Blog Preview</h3>
            <BlogCard 
            title={previewBlogData.title}
             description={previewBlogData.description}
              author={previewBlogData.author}
              update={(previewBlogData.last_updated).split("T")[0]}
               image={previewBlogData.image} />
            <Button variant="warning" className="mt-4" onClick={handleSubmit}>
              {loading? <FontAwesomeIcon icon={faSpinner} spinPulse /> : "Publish"}
            </Button>
          </div>
        )}
       
    </div>
    </>
   
  );
};

export default CreateBlog;
