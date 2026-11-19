import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { FaPencilAlt } from 'react-icons/fa'

import { updatePost } from '../../store/modules/posts/actions/postsAction'

const EditPost = ({ post, className }) => {

  const [modal, setModal] = useState(false);

  const [postUpdate, setPostUpdate] = useState("")

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const authID = currentState.Auth.currentUser.id

  const theUpdate = details => dispatch(updatePost(details, updateSuccess))

  const updateSuccess = () => {
    setModal(!modal);
  }

  useEffect(() => {
    setPostUpdate(post)
  }, [post]);

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
    setPostUpdate(post)
  } 

  const handleChange = e => {
    setPostUpdate({
      ...postUpdate,
      [e.target.name]: e.target.value
    })
  }

  const submitPost = (e) => {
    e.preventDefault()
    theUpdate({
      id: post.id,
      title: postUpdate.title,
      content: postUpdate.content,
      author_id: authID
    })
  }

  return (
    <span>
      <FaPencilAlt className="style-edit " onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Post</ModalHeader>
        <ModalBody>
        {currentState.PostsState.postsError ? (
          <small className="color-red" role="alert">{currentState.PostsState.postsError}</small>
        ) : null}
          <FormGroup>
            <label>Title hello</label>
            <input className="form-control" type="text" name="title"  defaultValue={postUpdate.title}  onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <label>Content</label>
            <textarea className="form-control" name="content" style={{ width: "100%", height: "150px" }} defaultValue={postUpdate.content} onChange={handleChange}></textarea>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
        { currentState.PostsState.isLoading ? (
              <button className="btn btn-primary"
                disabled
              >
                Updating...
            </button>
            ) : (
              <button className="btn btn-primary"
                onClick={submitPost}
                type="submit"
              >
              Update
            </button>
            )}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default EditPost;