/* global describe, it, expect */
import request from 'supertest'

import app from '../src/appInstance'

describe('/POST /api/shorturl/new', () => {
  it('should return a response that contain shortened URL', () => {
    return request(app.expressApp)
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
})
