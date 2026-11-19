import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreatePost from './components/posts/CreatePost';
import Dashboard from './components/Dashboard';
import { history } from './history'
import Profile from './components/users/Profile';
import PostDetails from './components/posts/PostDetails'
import AuthPosts from './components/posts/AuthPosts'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.Auth.isAuthenticated)

  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  )
}

const Routes  = () => {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
            <PrivateRoute path='/createpost' component={CreatePost} />
            <PrivateRoute path='/profile/:id' component={Profile} />
            <PrivateRoute path='/posts/:id' component={PostDetails} />
            <PrivateRoute path='/authposts' component={AuthPosts} />
          </Switch>
        </div>
      </Router>
      
    );
}

export default Routes;

