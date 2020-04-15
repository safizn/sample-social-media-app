import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.client.js'
import config from '../config/config.js'

export const compile = (app) => {
  if(config.env == "development"){
    const compiler = webpack(webpackConfig)
    const middleware = webpackMiddleware(compiler, {
      // lazy: false,
      publicPath: webpackConfig.output.publicPath,
      // headers: { 'Access-Control-Allow-Origin': '*' },
    })
    app.use(middleware)
    app.use(webpackHotMiddleware(compiler, {
      // path: '/__webpack_hmr',
      // heartbeat: 10 * 1000,
      // noInfo: false,
      // quiet: false,
    }))
  }
}
