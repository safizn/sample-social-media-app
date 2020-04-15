import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, Icon, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
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

class EditProfile extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      redirectToProfile: false,
      error: '',
      // userId
    }
    this.match = match
  }

  handleChange = name => event => this.setState({ [name]: event.target.value })

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    read({ userId: this.match.params.userId }, { t: jwt.token })
      .then((data) => {
        if (data.error) this.setState({error: data.error})
        else this.setState({ name: data.name, email: data.email })
      })
  }

  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: this.state.name || undefined, 
      email: this.state.email || undefined,
      password: this.state.password || undefined, 
    }
    update({ userId: this.match.params.userId }, { t: jwt.token }, user)
      .then(data => {
        if(data.error) this.setState({ error: data.error })
        else this.setState({ userId: data._id, redirectToProfile: true })
      })
  }

  render() {
    const {classes} = this.props
    if (this.state.redirectToProfile) return (<Redirect to={'/user/' + this.state.userId}/>)
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Profile
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)