import React, { useCallback, useContext, useEffect } from "react";
import { StoreContext } from "../../ContextAPI/StoreContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteBlog = () => {
  const { setNewPostData, modalVisible, hideModal, token, navigate } =
    useContext(StoreContext);
  const { id } = useParams();

  const confirmDelete = () => {
    handleDelete(id);
    hideModal();
  };

  const cancelDelete = () => {
    hideModal();
    navigate(`/blog/${id}`);
  };

  const handleDelete = (id) => {
    const storedBlogs = JSON.parse(localStorage.getItem("Blogs")) || [];

    const updatedBlogs = storedBlogs.filter((blog) => blog.id !== id);
    localStorage.setItem("Blogs", JSON.stringify(updatedBlogs));

    setNewPostData(updatedBlogs);
    toast.success("Blog deleted successfully! 🚮");
    navigate("/blog/personal");
  };

  useEffect(()=>{
    if(!token){
      toast.error(`Unauthorized error! Kindly Login to proceed`, {theme: 'dark'})
      navigate("/user/login");
    }
  }, [])

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ color: "#94041f" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h5>
            </div>
            <div className="modal-body ">
              Are you sure you want to delete this blog post?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBlog;
