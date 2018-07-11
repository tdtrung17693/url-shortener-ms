let database

if (process.env.NODE_ENV === 'development') {
  database = require('./database.dev')
} else if (process.env.NODE_ENV === 'production') {
  database = require('./database.prod')
} else {
  database = require('./database.test')
}

module.exports = database
