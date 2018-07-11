import createError from 'http-errors'
import express from 'express'
import morgan from 'morgan'

import winston from './config/winston'
import apiRouter from './routes/api'

const app = express()

// logger
app.use(morgan('common', { stream: winston.stream }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api', apiRouter)

app.use('/', (req, res) => {
  res.send('Hallo da draussen!')
})

// error handler
app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
