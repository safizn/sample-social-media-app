import { hot } from 'react-hot-loader/root'
import { ThemeProvider } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter.js'
import theme from './theme.js'

const App = () => (
  <BrowserRouter> 
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  </BrowserRouter>
)

export default hot(App)
