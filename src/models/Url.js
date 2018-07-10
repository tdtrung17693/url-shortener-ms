import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
  original_url: String,
  shortened_url: String
})

export default mongoose.model('URL', urlSchema)
