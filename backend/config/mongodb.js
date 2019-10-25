const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/articlesdbstats',{ useNewUrlParser: false, useUnifiedTopology: true  })
    .catch(e => {
        const msg = 'Not connected to Mongo DB !'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })

//problem with connecting to mongo db