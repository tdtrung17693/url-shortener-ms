import { initializeDb } from './db'

import { Counter } from '../models'

initializeDb(() => {
  const counter = Counter({
    name: 'url_count',
    seq: 0
  })

  counter.save((err) => {
    if (err) {
      console.log(err.message)

      process.exit(1)
    }

    console.log('url counter successfully created')
    process.exit(0)
  })
})
