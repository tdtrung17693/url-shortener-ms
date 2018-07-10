import mongoose from 'mongoose'

const counterSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true, dropDups: true },

  seq: { type: Number, default: 0 }
})

export default mongoose.model('counter', counterSchema)
