let express = require('express');
let bp = require('body-parser');
let server = express();

require('./db/gearhost-config')

//middleware
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }))

//routes
let schoolRoutes = require('./routes/school-routes')
let classroomRoutes = require('./routes/classroom-routes')
let teacherRoutes = require('./routes/teacher-routes')
let studentRoutes = require('./routes/student-routes')

server.use('/api/schools', schoolRoutes)
server.use('/api/classrooms', classroomRoutes)
server.use('/api/teachers', teacherRoutes)
server.use('/api/students', studentRoutes)

//catchall
server.use('*', (req, res, next) => {
  res.status(404).send('No matching routes')
})

//server
let port = 3000
server.listen(port, () => {
  console.log('Running on port ', port)
})