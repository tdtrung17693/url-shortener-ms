import createError from 'http-errors'
import express from 'express'

import apiRouter from './routes/api'

class App {
  constructor (env) {
    this._app = express()
    this._env = env
  }

  init () {
    this.middlewareConfig()
    this.routerConfig()
    this.errorHandler()
  }

  middlewareConfig () {
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: false }))
  }

  routerConfig () {
    this._app.use('/api', apiRouter)

    this._app.use('/', (req, res) => {
      res.send('Hallo da draussen!')
    })
  }

  errorHandler () {
    this._app.use((req, res, next) => {
      next(createError(404))
    })

    this._app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      // render the error page
      res.status(err.status || 500)
      res.render('error')
    })
  }

  set (key, value) {
    this._app.set(key, value)
  }

  get expressApp () {
    return this._app
  }

  static createApp () {
    let app = new App()
    app.init()

    return app
  }
}

export default App
