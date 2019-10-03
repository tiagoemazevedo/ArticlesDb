const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:articlesdb_stats',{ useNewUrlParser: true })
    .catch(e => {
        const msg = 'Not connected to Mongo DB !'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })