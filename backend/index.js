const app = require('express')()
const consign = require('consign')
const mongoose = require('mongoose')

require('./config/mongodb')

const db = require('./config/db')

app.db = db
app.mongoose = mongoose

consign()
    .include('./config/middlewares.js')
    .then('./config/passport.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, ()=> {
    console.log('backend running')
})