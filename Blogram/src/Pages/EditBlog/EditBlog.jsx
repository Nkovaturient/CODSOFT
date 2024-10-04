import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../ContextAPI/StoreContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Container, Badge } from 'react-bootstrap';
import BlogCard from '../../Components/BlogCard';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const EditBlog = () => {
  const { newPostData, setNewPostData, navigate,token, blogIndex, setBlogIndex, loading, setLoading } = useContext(StoreContext);

  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
  });

  const [inputTag, setInputTag] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const {id}=useParams();

  useEffect(() => {
    
    const blogToEdit = newPostData.find((blog) => blog.id === id);
    if (blogToEdit) {
      setBlogData(blogToEdit);
      setPreviewImage(blogToEdit.image);
    }
    setBlogIndex(id);
  }, [newPostData, setBlogIndex]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && inputTag.trim() !== '') {
      e.preventDefault();
      if (!blogData.tags.includes(inputTag.trim())) {
        setBlogData((prev) => ({
          ...prev,
          tags: [...prev.tags, inputTag.trim()],
        }));
      }
      setInputTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setBlogData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setBlogData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedBlogList = newPostData.map((blog) => {
      if (blog.id === blogIndex) {
        return { ...blog, ...blogData, last_updated: new Date().toISOString() };
      }
      return blog;
    });

    setNewPostData(updatedBlogList);
    setLoading(false);
    toast.success("Updated Successfully!");

    setTimeout(() => {
      navigate(`/blog/${id}`);
    }, 1000);
  };

  useEffect(()=>{
    if(!token){
      toast.error(`Unauthorized error! Kindly Login to proceed`, {theme: 'dark'})
      navigate("/user/login");
    }
  }, [])

  // console.log('edited=', newPostData);

  return (
    <Container className="edit-blog-container mt-5">
      <h2>Edit Blog</h2>

      <Form onSubmit={handleUpdate} className="mt-4">
        <Form.Group controlId="editTitle">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            required
            placeholder="Update blog title"
          />
        </Form.Group>

        <Form.Group controlId="editDescription" className="mt-3">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="description"
            value={blogData.description}
            onChange={handleInputChange}
            required
            placeholder="Update blog content"
          />
        </Form.Group>

        <Form.Group controlId="editTags" className="mt-3">
          <Form.Label>Tags (Press Enter to add):</Form.Label>
          <Form.Control
            type="text"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyPress={handleTagInput}
            placeholder="Update tags"
          />
          {blogData.tags.length > 0 && (
            <div className="tags mt-2">
              {blogData.tags.map((tag, index) => (
                <Badge key={index} bg="dark" className="me-1">
                  {tag}{' '}
                  <span onClick={() => removeTag(tag)} style={{ cursor: 'pointer' }}>
                    &times;
                  </span>
                </Badge>
              ))}
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="editImage" className="mt-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
          {previewImage && (
            <div className="mt-3 text-center">
              <img src={previewImage} alt="Preview" className="img-fluid" />
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Update Blog'}
        </Button>
      </Form>

      {/* Blog Preview after editing */}
      <div className="preview-blog mt-5">
        <h3>Blog Preview</h3>
        <BlogCard
          title={blogData.title}
          description={blogData.description}
          author={blogData.author}
          update={blogData.last_updated}
          image={blogData.image}
        />
      </div>
    </Container>
  );
};

export default EditBlog;
