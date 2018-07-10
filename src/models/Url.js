import mongoose from 'mongoose'
import Counter from './Counter'

const urlSchema = new mongoose.Schema({
  inc_id: Number,
  original_url: String,
  shortened_url: String
})

urlSchema.pre('save', function (next) {
  var doc = this
  // find the url_count and increment it by 1
  Counter.findOneAndUpdate({name: 'url_count'}, { $inc: { seq: 1 } }, { new: true }, (err, counter) => {
    if (err) { return next(err) }

    // set the _id of the urls collection to the incraemented value of the counter
    doc.inc_id = counter.seq
    doc.created_at = new Date()
    next()
  })
})

export default mongoose.model('URL', urlSchema)
