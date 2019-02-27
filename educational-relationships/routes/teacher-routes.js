const router = require('express').Router();
let Teachers = require('../models/Teacher');
let Students = require('../models/Student')

router.use('*', (req, res, next) => {
  console.log('A new Teacher');
  next()
});

router.get('', (req, res, next) => {
  Teachers.find({})
    .then(teacher => {
      res.send(teacher)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
});

router.get('/:id', (req, res, next) => {
  Teachers.findById(req.params.id)
    .then(teacher => res.send(teacher))
    .catch(err => res.status(400).send(err))
})


router.get('/:id/students', (req, res, next) => {
  Students.find({ teacher: req.params.id })
    .then(students => res.send(students))
    .catch(err => res.status(400).send(err))
})

router.post('', (req, res, next) => {
  Teachers.create(req.body)
    .then(teacher => res.send(teacher))
    .catch(err => res.status(400).send(err))
})

router.put('/:id', (req, res, next) => {
  Teachers.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(teacher => {
      res.status(200).send(teacher)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

//delete
router.delete('/:id', (req, res, next) => {
  Teachers.findOneAndDelete({ _id: req.params.id })
    .then(oldData => {
      res.status(200).send('Successfully deleted teacher')
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

module.exports = router