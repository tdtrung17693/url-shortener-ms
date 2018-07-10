import { Router } from 'express'

const router = Router()

function constructMessage () {
  let original_url = ''
  let short_url = ''

  return {
    original_url, short_url
  }
}

router.get('/', (req, res) => {
  res.send('FCC Project - URL Shortener')
})

router.post('/shorturl/new', (req, res) => {
  res.json(constructMessage())
})

export default router
