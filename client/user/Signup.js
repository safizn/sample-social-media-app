import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, Icon, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { create } from './api-user.js'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
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

const Signup = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  
  const [dialog, setDialog] = useState({ 
    open: false,
    error: ''
  })

  const handleChange = name => event => setUser({ ...user, [name]: event.target.value })

  const clickSubmit = () => {
    const _user = {
      name: user.name || undefined, 
      email: user.email || undefined,
      password: user.password || undefined, 
    }
    create(_user).then(response => {
      if(response.error) setDialog({ ...dialog, error: response.error })
      else setDialog({ ...dialog, error: '', open: true })
    })
  }

  const {classes} = props
  return (<div>
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Sign Up
        </Typography>
        <TextField id="name" label="Name" className={classes.textField} value={user.name} onChange={handleChange('name')} margin="normal"/><br/>
        <TextField id="email" type="email" label="Email" className={classes.textField} value={user.email} onChange={handleChange('email')} margin="normal"/><br/>
        <TextField id="password" type="password" label="Password" className={classes.textField} value={user.password} onChange={handleChange('password')} margin="normal"/>
        <br/> {
          dialog.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {dialog.error}</Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
    <Dialog open={dialog.open} disableBackdropClick={true}>
      <DialogTitle>New Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          New account successfully created.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link to="/signin">
          <Button color="primary" autoFocus="autoFocus" variant="contained">
            Sign In
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  </div>)
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)