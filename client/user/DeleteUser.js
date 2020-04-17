import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Redirect, Link } from 'react-router-dom'
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import auth from '../auth/auth-helper.js'
import {remove} from './api-user.js'

const DeleteUser = (props) => {
  const [redirectState, setRedirectState] = useState({ 
    redirect: false,
    open: false
  })


  const clickButton = () => setRedirectState({...redirectState, open: true})
  const deleteAccount = () => {
    const jwt = auth.isAuthenticated()
    remove({ userId: props.userId }, { t: jwt.token }).then(data => {
      if (data.error) console.log(data.error)
      else {
        auth.signout(() => console.log('deleted'))
        setRedirectState({ ...redirectState, redirect: true })
      }
    })
  }
  const handleRequestClose = () => setRedirectState({ ...redirectState, open: false})

  if (redirectState.redirect) return <Redirect to='/'/>
  return (<span>
    <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
      <DeleteIcon/>
    </IconButton>

    <Dialog open={redirectState.open} onClose={handleRequestClose}>
      <DialogTitle>{"Delete Account"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete your account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </span>)
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}

export default DeleteUser


