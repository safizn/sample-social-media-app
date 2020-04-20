import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link, useParams } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Paper, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, IconButton, Button, Typography, Divider } from '@material-ui/core'
import { Edit, Person } from '@material-ui/icons'
import { read } from "./api-user.js";
import auth from '../auth/auth-helper.js'
import DeleteUser from './DeleteUser.js'
import FollowProfileButton from './FollowProfileButton.js'
import FollowGrid from './FollowGrid.js'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle
  }
})

const Profile = (props) => { 
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [flag, setFlag] = useState({ following: false })
  const [ redirectToSignin, set_redirectToSignin] = useState(false)

  useEffect(() => {
    if(flag.error) console.log(flag.error)
  }, [flag])

  const clickFollowButton = (callApi) => {
    const jwt = auth.isAuthenticated()
    callApi({ userId: jwt.user._id}, { t: jwt.token }, user._id)
      .then(data => {
        if(data.error) throw new Error(data.error)
        setUser(data)
        setFlag({...flag, following: !flag.following }) // toggle
      })
      .catch(err => setFlag({...flag, error: err}))
  }

  const checkFollow = (user) => {
    const jwt = auth.isAuthenticated() 
    const match = user.followers.find(follower => follower._id == jwt.user._id)
    return Boolean(match)
  }

  const init = (userId) => {
    const jwt = auth.isAuthenticated() 
    read({ userId }, { t: jwt.token})
      .then(data => {
        if(data.error) set_redirectToSignin(true)
        else {
          setUser(data)
          let following = checkFollow(data)
          setFlag({ ...flag, following })
        }
      })
  }

  useEffect(() => init(userId), [userId])

  const photoUrl = user._id ? 
    `/api/users/photo/${user._id}?${new Date().getTime()}` : 
    `/api/users/defaultphoto`

  const {classes} = props 
  if(redirectToSignin) return <Redirect to='/signin' />
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl} className={classes.bigAvatar}/>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email}/> {
            (auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id) 
              ? (<ListItemSecondaryAction>
                  <Link to={"/user/edit/" + user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                  <DeleteUser userId={user._id}/>
                </ListItemSecondaryAction>)
              : <FollowProfileButton following={flag.following || false} onButtonClick={clickFollowButton} />
          }
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary={user.about} secondary={"Joined: " + (
            new Date(user.created)).toDateString()}/>
        </ListItem>
        <Divider /> 
        <FollowGrid people={user.following || []}/>
        <FollowGrid people={user.followers || []}/>
      </List>
    </Paper>
  )
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
