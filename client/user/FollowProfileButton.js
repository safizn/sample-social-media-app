import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { follow, unfollow } from './api-user.js'

const FollowProfileButton = (props) => {
  const followClick = () => props.onButtonClick(follow)
  const unfollowClick = () => props.onButtonClick(unfollow)
  
  return (<div>
    {props.following
      ? (<Button variant="contained" color="secondary" onClick={unfollowClick}>Unfollow</Button>)
      : (<Button variant="contained" color="primary" onClick={followClick}>Follow</Button>)}
  </div>)
}

FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
}

export default FollowProfileButton