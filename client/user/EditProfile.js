import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, useParams } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, Icon, Button, TextField, Typography } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { create } from './api-user.js'
import { update, read } from "./api-user.js";
import auth from "../auth/auth-helper.js";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.openTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
})

const EditProfile = (props) => {  
  const params = useParams()

  const [user, setUser] = useState({
      name: '',
      about: '',
      photo: '',
      email: '',
      password: '',
  })
  const [formData] = useState(new FormData())
  
  const [redirect, setRedirect] = useState({ 
      redirectToProfile: false,
      error: '',
  })

  useEffect(() => {
    const jwt = auth.isAuthenticated()
    read({ userId: params.userId }, { t: jwt.token })
      .then((data) => {
        if (data.error) setRedirect({...redirect, error: data.error})
        else setUser({ ...user, name: data.name, email: data.email })
      })
  }, [])
  
  const handleChange = name => event => {
    let value; 
    value = (name == 'photo') ? event.target.files[0] : event.target.value
    formData.set(name, value)
    // new Response(formData).text().then(console.log) // debug form data.
    setUser({ ...user, [name]: value })
  }

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()

    // used previously when sent a json instead.
    // const _user = {
    //   name: user.name || undefined, 
    //   about: user.about || undefined,
    //   email: user.email || undefined,
    //   password: user.password || undefined, 
    // }

    update({ userId: params.userId }, { t: jwt.token }, formData)
      .then(data => {
        if(data.error) setRedirect({ ...redirect, error: data.error })
        else setRedirect({ ...redirect, userId: data._id, redirectToProfile: true })
      })
  }

  const {classes} = props
  if (redirect.redirectToProfile) return (<Redirect to={'/user/' + redirect.userId}/>)
  
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Profile
        </Typography>
        <TextField id="name" label="Name" className={classes.textField} value={user.name} onChange={handleChange('name')} margin="normal"/><br/>
        <TextField id="multiline-flexible" label="about" multiline rows="2" className={classes.textField} value={user.about} onChange={handleChange('about')} margin="normal"/>
        <br/>
        <input accept="image/*" type="file" id="icon-button-file" style={{display: 'none'}} onChange={handleChange('photo')} />
        <label htmlFor="icon-button-file"><Button variant="contained" color="default" component="span">
          Upload <PhotoCamera/>
        </Button></label>
        <span className={classes.filename}>{user.photo ? user.photo.name : ''}</span> 
        <br/>
        <TextField id="email" type="email" label="Email" className={classes.textField} value={user.email} onChange={handleChange('email')} margin="normal"/><br/>
        <TextField id="password" type="password" label="Password" className={classes.textField} value={user.password} onChange={handleChange('password')} margin="normal"/>
        <br/> {
          redirect.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {redirect.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
  )
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)