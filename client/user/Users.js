import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ArrowForward, Person } from '@material-ui/icons'
import { list } from './api-user.js'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
})

class Users extends Component {
  state = { users: [] }

  async componentDidMount() {
    await list().then(data => {
      if(data.error) console.log(error)
      else this.setState({ users: data })
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>All Users</Typography>
        <List dense>
          {
            this.state.users.map((item, i)=> {              
              return <Link to={`/user/${item._id}`} key={i}> 
                <ListItem button>
                  <ListItemAvatar><Avatar><Person/></Avatar></ListItemAvatar>
                  <ListItemText primary={item.name}/>
                  <ListItemSecondaryAction>
                    <IconButton><ArrowForward/></IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            })
          }
        </List>
      </Paper>
    )
  } 
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Users)
