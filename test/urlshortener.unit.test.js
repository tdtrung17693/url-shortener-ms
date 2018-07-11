/* global describe, it, expect, beforeAll, afterAll */
import UrlService from '../src/services/urlShortenerService'
import mongoose from 'mongoose'
import database from '../config/database'
import Counter from '../src/models/Counter'

let counter

describe('UrlShortener Service', () => {
  beforeAll(async () => {
    await mongoose.connect(database.connection, { useNewUrlParser: true })
    counter = Counter({
      name: 'url_count',
      seq: 0
    })

    try {
      await counter.save()
    } catch (e) {
    }
  })

  afterAll(async () => {
    await counter.remove()
    await mongoose.connection.close()
  })

  it('should reject if url is invalid', () => {
    return UrlService.getShortUrl('//a')
      .catch(e => expect(e).toBeTruthy())
  }, 30000)

  it('should return an encoded id of the original URL', () => {
    expect.assertions(1)
    return UrlService.getShortUrl('www.google.com')
      .then(encodedId => {
        expect(typeof encodedId).toBe('string')
      })
  }, 50000)

  it('should return an original url from en encoded id', () => {
    expect.assertions(2)

    return UrlService.getShortUrl('www.google.com')
      .then(encodedId => {
        return UrlService.getOriginalUrl(encodedId)
      })
      .then(originalUrl => {
        expect(typeof originalUrl).toBe('string')
        expect(originalUrl).toBe('www.google.com')
      })
  })
})
