import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {GridList, GridListTile, Avatar, Typography, Button, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from '@material-ui/core'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
})

const FollowGrid = (props) => {
  const { classes } = props
  return (<div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {props.people.map((person, i) => {
            return  (<GridListTile style={{'height':120}} key={i}>
              <Link to={"/user/" + person._id}>
                <Avatar src={'/api/users/photo/'+person._id} className={classes.bigAvatar}/>
                <Typography className={classes.tileText}>{person.name}</Typography>
              </Link>
            </GridListTile>)
        })}
      </GridList>
    </div>)
}

FollowGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  people: PropTypes.array.isRequired
}

export default withStyles(styles)(FollowGrid)
