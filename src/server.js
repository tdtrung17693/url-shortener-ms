import http from 'http'
import Debugger from 'debug'

import app from './appInstance'
import { normalizePort, generateOnError, generateOnListening } from './utils'

const server = http.createServer(app.expressApp)
const port = normalizePort(process.env.PORT || '3000')
const debug = Debugger('request-header-parser-microservice:server')

app.set('port', port)
server.listen(port)
server.on('error',
  generateOnError(port))
server.on('listening',
  generateOnListening(debug, server.address()))
