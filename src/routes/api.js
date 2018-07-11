import { Router } from 'express'

import UrlShortener from '../services/urlShortenerService'

const router = Router()
async function constructMessage (original_url) {
  const originalUrlWithoutProtocol = original_url.replace(/(http|https):\/\//, '')

  let short_url

  try {
    short_url = await UrlShortener.getShortUrl(originalUrlWithoutProtocol)
  } catch (err) {
    return { 'error': 'invalid URL' }
  }

  return {
    original_url, short_url
  }
}

router.get('/', (req, res) => {
  res.send('FCC Project - URL Shortener')
})

router.post('/shorturl/new', async (req, res) => {
  res.json(await constructMessage(req.body.original_url))
})

router.get('/shorturl/:encoded_id', async (req, res) => {
  let original_url

  try {
    original_url = await UrlShortener.getOriginalUrl(req.params.encoded_id)
  } catch (err) {
    return console.error(err)
  }

  if (original_url) {
    return res.redirect(original_url)
  }

  return res.json({
    'error': 'No short url found for given input'
  })
})

export default router
