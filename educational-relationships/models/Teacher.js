let mongoose = require('mongoose')
let Students = require('./Student')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let teacher = new Schema({
  name: { type: String, required: true },
  classroom: { type: ObjectId, ref: 'Classroom', required: true }
})

teacher.pre("remove", function (next) {
  Students.remove({ teacher: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model('Teacher', teacher)