import React, { useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import Default from '../../Assets/default.png'
import { fetchPost } from '../../store/modules/posts/actions/postsAction'
import Navigation from '../Navigation'
import EditPost from './EditPost';
import DeletePost from './DeletePost'

const PostDetails = (props) => {
  const postID = props.match.params.id
  const dispatch = useDispatch()
  const currentState = useSelector(state => state)
  const post = currentState.PostsState.post
  const authID = currentState.Auth.currentUser.id

  useEffect(() => {
    dispatch(fetchPost(postID))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="page-container">
      <Navigation />
      <div className="container">
        {currentState.PostsState.postsError ? (
          <p className="color-red" role="alert">{currentState.PostsState.postsError}</p>
        ) : post.id ? (
          <div className="mt-5 style-card">
            <Card>
              <CardBody style={{paddingBottom: "0px"}}>
                <CardTitle>
                  <span>
                    <span className="mr-2">
                      <img className="img_style_post" src={Default} alt="" />
                    </span>
                    <span style={{fontWeight: 'bold'}}>{post.author ? post.author.nickname : ''}</span>
                  </span>
                  <span style={{float: 'right'}}>
                    <Moment fromNow>{post.created_at}</Moment>
                  </span>
                </CardTitle>
                <CardTitle>{post.title}</CardTitle>
                <CardText>{post.content}</CardText>
                {authID === post.author_id ? (
                  <div className="style-fav ml-auto">
                    <span style={{marginRight: "20px"}}>
                      <EditPost post={post} />
                    </span>
                    <DeletePost postID={post.id} />
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </div>
        ) : currentState.PostsState.isLoading ? null : (
          <p className="text-center">Post not found.</p>
        )}
      </div>
    </div>
  )
}

export default PostDetails
