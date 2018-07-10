import dns from 'dns'
import Url from '../models/Url'

const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
const base = alphabet.length

function encode (num) {
  let encoded = ''
  while (num) {
    var remainder = num % base
    num = Math.floor(num / base)
    encoded = alphabet[remainder].toString() + encoded
  }

  return encoded
}

function decode (str) {
  var decoded = 0
  while (str) {
    var index = alphabet.indexOf(str[0])
    var power = str.length - 1
    decoded += index * (Math.pow(base, power))
    str = str.substring(1)
  }
  return decoded
}

export default {
  getShortUrl (originalUrl) {
    return new Promise((resolve, reject) => {
      dns.lookup(originalUrl, (err, address, family) => {
        if (err) {
          return reject(err)
        }

        Url
          .findOne({ original_url: originalUrl })
          .then(url => {
            return url
          })
          .then((data) => {
            if (data !== null) {
              return resolve(encode(data.inc_id))
            }

            const newUrl = Url({
              original_url: originalUrl
            })

            newUrl.save((err) => {
              if (err) {
                return reject(err)
              }

              resolve(encode(newUrl.inc_id))
            })
          })
          .catch(err => {
            reject(err)
          })
      })
    })
  },

  getOriginalUrl (shortUrlId) {
    const inc_id = decode(shortUrlId)

    return Url
      .findOne({ inc_id })
      .then((data) => {
        if (!data) {
          return
        }

        return data.original_url
      })
      .catch(err => {
        return new Error(err)
      })
  }
}
