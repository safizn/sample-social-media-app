import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import seashellImg from '../assets/images/seashell.jpg'
import auth from '../auth/auth-helper.js'
import FindPeople from '../user/FindPeople.js'
import Newsfeed from './../post/Newsfeed'

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
  
  const {classes} = props
  return (
    <div className={classes.root}>
      {flag.defaultPage &&
        <Grid container spacing={10}>
          <Grid item xs={9}>
            <Card className={classes.card}>
              <Typography type="headline" component="h2" className={classes.title}>
                Home Page
              </Typography>
              <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells"/>
              <CardContent>
                <Typography type="body1" component="p">
                  Welcome to the MERN Social home page. 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      }
      {!flag.defaultPage &&
        <Grid container spacing={10}>
          <Grid item xs={8} sm={7}>
            <Newsfeed/>
          </Grid>
          <Grid item xs={6} sm={5}>
            <FindPeople/>
          </Grid>
        </Grid>
      }
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)