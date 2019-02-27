let mongoose = require('mongoose')
let Teachers = require('./Teacher')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let classroom = new Schema({
  name: { type: String, required: true },
  school: { type: ObjectId, ref: 'School', required: true }
})

classroom.pre("remove", function (next) {
  Teachers.remove({ classroom: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model('Classroom', classroom)