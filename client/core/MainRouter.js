import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../auth/PrivateRoute.js'
import Home from './Home.js'
import Menu from './Menu.js'
import Users from '../user/Users.js'
import Signup from '../user/Signup.js'
import Signin from '../auth/Signin.js'
import Profile from '../user/Profile.js'
import EditProfile from '../user/EditProfile.js'

const MainRouter = () => {

  // Removes the server-side injected CSS when React component mounts
  React.useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, []) 
  
  return (<div>
    <Menu/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin">
        <Signin /> 
      </Route> 
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <Route path="/user/:userId">
        <Profile /> 
      </Route> 
    </Switch>
  </div>)
}

export default MainRouter