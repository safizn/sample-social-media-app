import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, Icon, Button, TextField, Typography } from '@material-ui/core'
import { signin } from './api-auth.js'
import auth from './auth-helper.js'

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

const Signin = (props) => {
  const location = useLocation()
  const [user, setUser] = useState({ email: '', password: '' })
  const [redirect, setRedirect] = useState({ error: '', redirectToReferrer: false })

  const handleChange = name => event => setUser({ ...user, [name]: event.target.value })

  const clickSubmit = () => {
    const _user = { 
      email: user.email || undefined,
      password: user.password || undefined
    }
    signin(_user).then(data => {
      if(data.error) setRedirect({ ...redirect, error: data.error })
      else auth.authenticate(data, () => setRedirect({ ...redirect, redirectToReferrer: true }) )
    })
  }

  const {classes} = props
  const {from} = location.state || { from: { path: '/' }}
  const {redirectToReferrer} = redirect
  if(redirectToReferrer)
    return (<Redirect to={from} />)
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Sign In
        </Typography>
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

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin)
