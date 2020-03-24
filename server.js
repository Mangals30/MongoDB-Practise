const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
let {students} = require('./views/students')
const fs = require('fs')
const os = require('os')
const {dateToday} = require('./views/date')
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json())

app.use((req,res,next) => {
    const user = os.hostname
    const page = req.url
    const content = `\n${user} acesss page ${page} on ${dateToday()}`
    fs.appendFile('log.txt',content,err => {
        if(err) {
            throw(err)
        }
        console.log('file appended')
    })
    next()
})

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/about', (req,res) => {
    res.sendFile(__dirname + '/views/about.html')
  })
  app.get('/contact', (req,res) => {
    res.sendFile(__dirname + '/views/contact.html')
  })
  app.get('/text', (req,res) => {
    res.sendFile(__dirname + '/views/text.txt')
  })
  app.get('/students', (req,res) => {
      if(students.length > 0) {
        res.send(students)
      }
      else {
          res.send('No students exist in the list')
      }
  })
  app.get('/students/:id',(req,res) => {
      const id = req.params.id
      const student = students.find(student => student.id == id || student.firstName.toLowerCase() == id.toLowerCase())
      if(student) {
        res.send(student)
      }
      else {
       res.send('Student does not exist') 
     } 
  })
  app.post('/students',(req,res) => {
      const allIds = students.map(student => student.id)
      let maxId = Math.max(...allIds)
      const id = maxId+1
      req.body.id = id
      students.push(req.body)
      res.send('A data has been added')
  }) 
  app.put('/students/:id',(req,res) => {
      let id = req.params.id
      const editedStudent = students.filter(student => student.id == id)
      if(editedStudent.length) {
        students = students.map(student => {
            if(student.id == id) {
                req.body.id = +id
                return req.body
            }
            
            return student
        })
        res.send('Student edited')
      }
      else {
          res.send('Student doesnot exist to edit')
      }
  })
  app.delete('/students/:id',(req,res) => {
      const id = req.params.id
      const deletedStudent = students.filter(student => student.id == id)
      if(deletedStudent.length)
      {
        students = students.filter(student => student.id!=id)
        res.send('Data deleted')
      }
      else {
        res.send('Student does not exist to delete')
      }
        
      
  })
app.listen(PORT, () => {
    console.log(`The server is running in port ${PORT}`)
})