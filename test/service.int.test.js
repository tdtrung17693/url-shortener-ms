/* global describe, it, expect, beforeAll, afterAll */
import request from 'supertest'
import mongoose from 'mongoose'

import { initializeDb } from '../src/database/db'
import Counter from '../src/models/Counter'
import app from '../src/app'

let counter

beforeAll(() => {
  initializeDb(async () => {
    counter = Counter({
      name: 'url_count',
      seq: 0
    })

    try {
      await counter.save()
    } catch (e) {
      // Duplicated. Nothings to worry about
    }
  })
})

afterAll(async () => {
  await counter.remove()
  await mongoose.connection.close()
})

describe('/POST /api/shorturl/new', () => {
  it('should return a response that contains shortened URL', () => {
    return request(app)
      .post('/api/shorturl/new')
      .send({original_url: 'http://www.google.com'})
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object)
        expect('original_url' in res.body).toBe(true)
        expect('short_url' in res.body).toBe(true)
      })
  })

  it('should return a response that contains an error message when requested with an invalid URL', () => {
    return request(app)
      .post('/api/shorturl/new')
      .send({original_url: 'http://asdasd'})
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object)
        expect('error' in res.body).toBe(true)
        expect(res.body.error).toBe('invalid URL')
      })
  }, 30000)
})

describe('/GET /api/shorturl/:encoded_id', () => {
  it('should redirect to the original URL if the encoded id exists', () => {
    const original_url = 'www.google.com'

    return request(app)
      .post('/api/shorturl/new')
      .send({ original_url })
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        request(app)
          .get(`/api/shorturl/${res.short_url}`)
          .then((res) => {
            expect(res.header['location']).toMatch(original_url)
          })
      })
  })
})
