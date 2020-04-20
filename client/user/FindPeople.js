import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {Paper, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, Button, IconButton, Typography, Snackbar, } from '@material-ui/core'
import {Visibility} from '@material-ui/icons'
import {findPeople, follow} from './api-user.js'
import auth from './../auth/auth-helper'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(),
    margin: 0
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing()}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  follow: {
    right: theme.spacing(2)
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: 'middle'
  }
})

class FindPeople extends Component {
  state = {
      users: [],
      open: false
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    findPeople({ userId: jwt.user._id }, { t: jwt.token }).then((data) => {
      if (data.error) console.log(data.error)
      else this.setState({users: data})
    })
  }

  clickFollow = (user, index) => {
    const jwt = auth.isAuthenticated()
    follow({ userId: jwt.user._id }, { t: jwt.token }, user._id).then((data) => {
      if (data.error) this.setState({error: data.error})
      else {
        let toFollow = this.state.users
        toFollow.splice(index, 1)
        this.setState({users: toFollow, open: true, followMessage: `Following ${user.name}!`})
      }
    })
  }

  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }

  render() {
    const {classes} = this.props
    return (<div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Who to follow
        </Typography>
        <List>
          {this.state.users.map((item, i) => {
              return <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}><Avatar src={'/api/users/photo/'+item._id}/></ListItemAvatar>
                  <ListItemText primary={item.name}/>
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={"/user/" + item._id}>
                      <IconButton variant="contained" color="secondary" className={classes.viewButton}><Visibility/></IconButton>
                    </Link>
                    <Button aria-label="Follow" variant="contained" color="primary" onClick={this.clickFollow.bind(this, item, i)}>Follow</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            })
          }
        </List>
      </Paper>
      <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          open={this.state.open}
          onClose={this.handleRequestClose}
          autoHideDuration={6000}
          message={<span className={classes.snack}>{this.state.followMessage}</span>}
      />
    </div>)
  }
}

FindPeople.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FindPeople)
