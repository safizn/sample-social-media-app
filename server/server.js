import path from "path"
import app from './express.js'
import config from "../config/config.js";
import mongoose from 'mongoose'

// fix deprecation warnings
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(config.mongoUri) 
mongoose.connection.on('error', (error) => {
  console.log(`Unable to connect to database: ${config.mongoUri}`)
  throw new Error(error)
})

app.listen(config.port, (err) => {
  if (err) console.log(err)
  console.info('Server started on port %s.', config.port)
})

