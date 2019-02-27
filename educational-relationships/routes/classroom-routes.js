const router = require('express').Router();
let Classrooms = require('../models/Classroom');
let Teachers = require('../models/Teacher')

router.use('*', (req, res, next) => {
  console.log('A new Classroom');
  next()
});

router.get('', (req, res, next) => {
  Classrooms.find({})
    .then(classroom => {
      res.send(classroom)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
});

router.get('/:id/teachers', (req, res, next) => {
  Teachers.find({ classroom: req.params.id })
    .then(teachers => res.send(teachers))
    .catch(err => res.status(400).send(err))
})



router.get('/:id', (req, res, next) => {
  Classrooms.findById(req.params.id)
    .then(classroom => res.send(classroom))
    .catch(err => res.status(400).send(err))
})

router.post('', (req, res, next) => {
  Classrooms.create(req.body)
    .then(classroom => res.send(classroom))
    .catch(err => res.status(400).send(err))
})

router.put('/:id', (req, res, next) => {
  Classrooms.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(classroom => {
      res.status(200).send(classroom)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

//delete
router.delete('/:id', (req, res, next) => {
  Classrooms.findOneAndDelete({ _id: req.params.id })
    .then(oldData => {
      res.status(200).send('Successfully deleted classroom')
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

module.exports = router