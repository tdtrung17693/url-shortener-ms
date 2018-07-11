import winston from 'winston'

const opts = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true
  }
}

let logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

logger.stream = {
  write: (message, encoding) => {
    logger.log('info', message)
  }
}

export default logger
