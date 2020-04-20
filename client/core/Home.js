import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import seashellImg from '../assets/images/seashell.jpg'
import FindPeople from '../user/FindPeople.js'
import auth from '../auth/auth-helper.js'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  }, 
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  }, 
  media: {
    minHeight: 330
  }
})

const Home = (props) => {
  const [flag, setFlag] = useState({ defaultPage: true })
  
  const init = () => {
    if(auth.isAuthenticated()) setFlag({...flag, defaultPage: false})
    else setFlag({...flag, defaultPage: true})
  }
  
  useEffect(() => init(), [])
  
  const { classes } = props
  return (
    <div> 
      <Card className={classes.card}>
        <Typography type="headline" component="h2" className={classes.title}>Home Page</Typography>
        <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" /> 
        <CardContent>
          <Typography type="body1" component="p">
            Welcome to the MERN Skeleton home page.
          </Typography>
        </CardContent>
      </Card>
      <br />
      {!flag.defaultPage && <FindPeople/>}
    </div> 
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)