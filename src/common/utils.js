/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
export function generateOnError (port) {
  return (error) => {
    if (error.syscall !== 'listen') {
      throw error
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
export function generateOnListening (debug, addr) {
  return () => {
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
    debug('Listening on ' + bind)
  }
}
