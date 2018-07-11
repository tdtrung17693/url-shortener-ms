#! /bin/env babel-node

import mongoose from 'mongoose'

import database from '../config/database'
import Counter from '../src/models/Counter'

mongoose.connect(database.connection, { useNewUrlParser: true })

const counter = Counter({
  name: 'url_count',
  seq: 0
})

counter.save((err) => {
  if (err) {
    console.log(err)

    process.exit(1)
  }

  console.log('url counter successfully created')
  process.exit(0)
})
