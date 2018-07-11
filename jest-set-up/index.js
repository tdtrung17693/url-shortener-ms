import winston from '../src/config/winston'
winston.transports.forEach((t) => (t.silent = true))
