let mongoose = require('mongoose')

//mongodb://<Username>:<password>@<database server>/<server name>
const connectionString = 'mongodb://education1497:Mj265gN~!J06@den1.mongo1.gear.host:27001/education1497'

let connection = mongoose.connection

mongoose.connect(connectionString, {
  useNewUrlParser: true
})

connection.on('error', err => {
  console.log('[DATABASE ERROR]: ', err)
})

connection.once('open', () => {
  console.log('Successfully connected to database')
})