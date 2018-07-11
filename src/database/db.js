import mongoose from 'mongoose'
import database from '../config/database'
import winston from '../config/winston'

export async function initializeDb (cb) {
  mongoose.connection.on('connected', function () {
    winston.info('Mongoose default connection open to ' + database.connection)

    cb()
  })

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    winston.error('Mongoose default connection error: ' + err)
  })

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    winston.info('Mongoose default connection disconnected')
  })

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      winston.info('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  })

  mongoose.connect(database.connection, { useNewUrlParser: true })
}
