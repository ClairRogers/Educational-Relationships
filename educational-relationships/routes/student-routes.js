const router = require('express').Router();
let Students = require('../models/Student');

router.use('*', (req, res, next) => {
  console.log('A new Student');
  next()
});

router.get('', (req, res, next) => {
  Students.find({})
    .then(students => {
      res.send(students)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
});



router.get('/:id', (req, res, next) => {
  Students.findById(req.params.id)
    .then(student => res.send(student))
    .catch(err => res.status(400).send(err))
})

router.post('', (req, res, next) => {
  Students.create(req.body)
    .then(student => res.send(student))
    .catch(err => res.status(400).send(err))
})

router.put('/:id', (req, res, next) => {
  Students.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(student => {
      res.status(200).send(student)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

//delete
router.delete('/:id', (req, res, next) => {
  Students.findOneAndDelete({ _id: req.params.id })
    .then(oldData => {
      res.status(200).send('Successfully deleted student')
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

module.exports = router