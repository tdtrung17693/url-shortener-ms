import http from 'http'
import Debugger from 'debug'

import app from './app'
import { initializeDb } from './database/db'

import { normalizePort, generateOnError, generateOnListening } from './common/utils'

const server = http.createServer(app)
const port = normalizePort(process.env.PORT || '3000')
const debug = Debugger('url-shortener:server')

initializeDb(() => {
  app.set('port', port)

  server.listen(port)

  server.on('error',
    generateOnError(port))

  server.on('listening',
    generateOnListening(debug, server.address()))
})
