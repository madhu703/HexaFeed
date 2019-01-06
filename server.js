const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const mongoose = require('mongoose')
const port = config.port ? config.port : 8000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const options = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 25, // Maintain up to 25 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  keepAlive: 120,
  promiseLibrary: global.Promise
}
let processexit = false;
var db = mongoose.connection
db.once('error', function (err) {
  console.error('mongoose connection error' + err)
  mongoose.disconnect()
})
db.on('open', function () {
  console.log('successfully connected to mongoose')
})
db.on('reconnected', function () {
  console.log('MongoDB reconnected!')
})
db.on('disconnected', function () {
  console.log('MongoDB disconnected!')
  if (!processexit) {
    mongoose.connect(config.mongodb.uri, options)
      .then(() => console.log('connection succesful'))
      .catch((err) => console.error(err))
  }
})
mongoose.connect(config.mongo_uri, options)
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err))

// Accessing Router.js
require('./REST/Routers')(app)


process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err);
});

process.on('SIGINT', function () {
  console.log(' on exit called by node');
  processexit = true;
  mongoose.connection.close()
});

// app.listen(port, () => console.log(`Server is listening on port ${port}!`))

module.exports = app
