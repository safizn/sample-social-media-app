import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

// modules for server side rendering
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles'
import theme from '../client/theme.js'
import MainRouter from './../client/MainRouter.js'
import template from "./template.js";

import staticRoutes from './routes/static.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express() 

// comment out for production build
import { compile } from './devBundle'
compile(app)

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())
app.use(morgan('dev'))

app.use('/', staticRoutes)

app.use('/', userRoutes)
app.use('/', authRoutes)

/** server-side render */
app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets()
  const context = {}
  const html = renderToString(sheets.collect(
    <StaticRouter location={req.url} context={context}>
      <ThemeProvider theme={theme}>
        <MainRouter/>
      </ThemeProvider>
    </StaticRouter>
  ))
  if (context.url) return res.redirect(303, context.url)
  const css = sheets.toString()
  return res.status(200).send(template({ html, css }))
})

app.use((err, req, res, next) => { 
  // handle unauthorized error (express-jwt)
  if(err.name === 'UnauthorizedError') res.status(401).json({ error: `${err.name}: ${err.message}` })
})

export default app