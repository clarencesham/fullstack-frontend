import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Label, Input, FormGroup, Button, CardBody, Col, Row, Form, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { updateUser, deleteUser } from '../../store/modules/auth/actions/authAction';
import Default from '../../Assets/default.png'
import './Profile.css'
import Message from '../utils/Message';
import Navigation from "../Navigation"

const Profile = () => {
  const [modal, setModal] = useState(false)
  const currentUserState = useSelector((state) => state.Auth)
  const currentUser = currentUserState.currentUser
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    nickname: currentUser.nickname || '',
    email: currentUser.email || '',
    password: ''
  })

  if (!currentUserState.isAuthenticated) {
    return <Redirect to='/login' />
  }

  const clearPassword = () => setUser(current => ({ ...current, password: '' }))
  const updateAccount = details => dispatch(updateUser(details, clearPassword))
  const deleteAccount = () => dispatch(deleteUser(currentUser.id))

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const submitUser = event => {
    event.preventDefault()
    updateAccount(user)
  }

  const toggle = event => {
    if (event) event.preventDefault()
    setModal(!modal)
  }

  const submitDelete = event => {
    event.preventDefault()
    deleteAccount()
  }

  return (
    <>
      <Navigation />
      <div className="post-style container">
        <div className="card-style">
          <div className="text-center">
            <h4>Update Profile</h4>
            <img className="img_style" src={Default} alt="" />
          </div>
          <CardBody>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                {currentUserState.userError ? (
                  <p className="color-red" role="alert">{currentUserState.userError}</p>
                ) : null}
                {currentUserState.authSuccessUser ? (
                  <Message msg={currentUserState.authSuccessUser} />
                ) : null}
                <Form onSubmit={submitUser}>
                  <FormGroup>
                    <Label for="nickname">Nickname</Label>
                    <Input
                      id="nickname"
                      type="text"
                      name="nickname"
                      value={user.nickname}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                    <small>The backend requires a password for profile updates; this value becomes the new password.</small>
                  </FormGroup>
                  <Button color="primary" type="submit" block disabled={currentUserState.isUpdatingUser}>
                    {currentUserState.isUpdatingUser ? 'Updating...' : 'Update'}
                  </Button>
                </Form>
                <FormGroup className="mt-3">
                  <Button color="danger" type="button" onClick={toggle} block>
                    Delete Account
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Delete Account?</ModalHeader>
          <ModalBody>This permanently deletes your account.</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={submitDelete} disabled={currentUserState.isLoading}>
              {currentUserState.isLoading ? 'Deleting...' : 'Delete'}
            </Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default Profile
