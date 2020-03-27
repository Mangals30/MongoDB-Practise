require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
let {students} = require('./views/students')
const fs = require('fs')
const os = require('os')
const {dateToday} = require('./views/date')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const Router = require('./routes/routes')


mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=> {
 if(err) return console.log(err)
 
console.log('The server is connected to database')
})
  
//Student.insertMany(students)


app.use(express.static('public'))
//app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use((req,res,next) => {
    const user = os.hostname
    const page = req.url
    const content = `\n${user} acesss page ${page} on ${dateToday()}`
    fs.appendFile('log.txt',content,err => {
        if(err) {
            throw(err)
        }
    })
    next()
})
app.use('/',Router)

app.listen(PORT, () => {
    console.log(`The server is running in port ${PORT}`)
})

