let mongoose = require('mongoose')
let Classrooms = require('./Classroom')
let Schema = mongoose.Schema

let school = new Schema({
  name: { type: String, required: true }
})

school.pre("remove", function (next) {
  Classrooms.remove({ school: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model('School', school)