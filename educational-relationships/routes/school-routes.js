const router = require('express').Router();
let Schools = require('../models/School');
let Classrooms = require('../models/Classroom')

router.use('*', (req, res, next) => {
  console.log('A new School');
  next()
});

router.get('', (req, res, next) => {
  Schools.find({})
    .then(school => {
      res.send(school)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
});

router.get('/:id/classrooms', (req, res, next) => {
  Classrooms.find({ school: req.params.id })
    .then(classrooms => res.send(classrooms))
    .catch(err => res.status(400).send(err))
})

// router.get('/:id/knights', (req, res, next) => {
//   Knights.find({ kingdom: req.params.id })
//     .then(knights => res.send(knights))
//     .catch(err => res.status(400).send(err))
// })

router.get('/:id', (req, res, next) => {
  Schools.findById(req.params.id)
    .then(school => res.send(school))
    .catch(err => res.status(400).send(err))
})

router.post('', (req, res, next) => {
  Schools.create(req.body)
    .then(school => res.send(school))
    .catch(err => res.status(400).send(err))
})

router.put('/:id', (req, res, next) => {
  Schools.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(school => {
      res.status(200).send(school)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

//delete
router.delete('/:id', (req, res, next) => {
  Schools.findOneAndDelete({ _id: req.params.id })
    .then(oldData => {
      res.status(200).send('Successfully deleted school')
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})

module.exports = router