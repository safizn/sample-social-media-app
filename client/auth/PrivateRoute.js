import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper.js'

const PrivateRoute = ({ component: Component /*Destructure*/, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() 
      ? (
          <Component {...props}/>
        ) 
      : (
          <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
          }}/>
        )
  )}/>
)

export default PrivateRoute
