import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { BEFORE_STATE_POST, FETCH_POSTS, FETCH_POSTS_ERROR, GET_POST_SUCCESS, GET_POST_ERROR, CREATE_POST_SUCCESS, CREATE_POST_ERROR, UPDATE_POST_SUCCESS, UPDATE_POST_ERROR, DELETE_POST_SUCCESS, DELETE_POST_ERROR, FETCH_AUTH_POSTS, FETCH_AUTH_POSTS_ERROR  } from '../postsTypes'
import  {history} from '../../../../history'
import { getApiErrorMessage } from '../../../../utils/apiError'
import { filterPostsByAuthor } from '../../../../utils/posts'

 
export const fetchPosts = () => {


  return async (dispatch, getState) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const currentUserID = Number(getState().Auth.currentUser.id)
      if (!Number.isSafeInteger(currentUserID) || currentUserID < 1) {
        throw new Error('Sign in to view posts.')
      }

      const res = await axios.get(`${API_ROUTE}/posts`)
      if (!Array.isArray(res.data)) {
        throw new Error('The posts endpoint did not return a list.')
      }
      const userPosts = filterPostsByAuthor(res.data, currentUserID)
      dispatch({ type: FETCH_POSTS, payload: userPosts })
    } catch (err) {
      dispatch({ type: FETCH_POSTS_ERROR, payload: getApiErrorMessage(err, 'Could not load posts.') })
    }
  }
}

export const fetchPost = id => {

  return async (dispatch, getState) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res  = await axios.get(`${API_ROUTE}/posts/${id}`)
      const currentUserID = Number(getState().Auth.currentUser.id)
      if (Number(res.data.author_id) !== currentUserID) {
        throw new Error('Post not found.')
      }
      dispatch({ type: GET_POST_SUCCESS, payload: res.data })
    } catch(err){
      dispatch({ type: GET_POST_ERROR, payload: getApiErrorMessage(err, 'Could not load this post.') })
      history.push('/'); //incase the user manually enter the param that dont exist
    }
  }
}

export const fetchAuthPosts = id => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res = await axios.get(`${API_ROUTE}/posts`)
      if (!Array.isArray(res.data)) {
        throw new Error('The posts endpoint did not return a list.')
      }
      const userPosts = filterPostsByAuthor(res.data, id)
      dispatch({ type: FETCH_AUTH_POSTS, payload: userPosts })
    } catch(err){
      dispatch({ type: FETCH_AUTH_POSTS_ERROR, payload: getApiErrorMessage(err, 'Could not load your posts.') })
    }
  }
}

export const createPost = (createPost) => {
  return async (dispatch, getState) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const currentUser = getState().Auth.currentUser
      const res = await axios.post(`${API_ROUTE}/posts`, {
        ...createPost,
        author_id: currentUser.id
      })
      dispatch({ 
        type: CREATE_POST_SUCCESS,  
        payload: res.data
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: CREATE_POST_ERROR, payload: getApiErrorMessage(err, 'Could not create the post.') })
    }
  }
}

export const updatePost = (updateDetails, updateSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res = await axios.put(`${API_ROUTE}/posts/${updateDetails.id}`, updateDetails)
      dispatch({ 
        type: UPDATE_POST_SUCCESS,
        payload: res.data
      })
      updateSuccess()
    } catch(err) {
      dispatch({ type: UPDATE_POST_ERROR, payload: getApiErrorMessage(err, 'Could not update the post.') })
    }
  }
}

export const deletePost = (id) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      await axios.delete(`${API_ROUTE}/posts/${id}`)
      dispatch({ 
        type: DELETE_POST_SUCCESS,
        payload: { deletedID: id }
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: DELETE_POST_ERROR, payload: getApiErrorMessage(err, 'Could not delete the post.') })
    }
  }
}
