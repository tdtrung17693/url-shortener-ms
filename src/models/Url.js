import { model, Schema } from 'mongoose'

const urlSchema = new Schema({
  original_url: String,
  shortened_url: String
})

export default Model('URL', urlSchema)
