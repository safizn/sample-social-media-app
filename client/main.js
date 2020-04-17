import React from 'react'
import { hydrate } from 'react-dom'
import App from "./core/App.js";

hydrate(<App />, document.getElementById('root'))