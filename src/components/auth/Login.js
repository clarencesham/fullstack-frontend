import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

import "./Auth.css";
import Navigation from '../Navigation'
import { SignIn } from '../../store/modules/auth/actions/authAction';




const Login = () => {

  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const userLogin = (credentials) => dispatch(SignIn(credentials))


  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    userLogin({
      email: user.email,
      password: user.password
    });
  }

  if(currentState.isAuthenticated){
    return <Redirect to='/' />
  }

    return (
      <div className="App" id="page-container">
        <div>
          <Navigation />
        </div>
        <div className="container Auth">
        <Card className="card-style">
          <CardHeader>Login</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <div className="mb-2">
            {currentState.loginError ? (
              <small className="color-red" role="alert">{currentState.loginError}</small>
            ) : null}
          </div>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            </FormGroup>

            { currentState.isLoading ? (
              <Button
                color="primary"
                type="submit"
                block
                disabled
              >
                Login...
              </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
                disabled={ user.email === "" || user.password === ""  }
              >
                Login
            </Button>
            )}
            </form>
            <div className="mt-2" style={{display: "flex", justifyContent: "space-between"}}>
              <div>
                <small><Link to="/signup">Sign Up</Link></small>
              </div>
            </div>
           
            </CardBody>
          </Card>
        </div>
        

        </div>
    );
}

export default Login

