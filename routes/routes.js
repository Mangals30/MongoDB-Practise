const express = require('express')
const Router = express.Router()

const {showHome,showAbout,showContact,showAdd,showStudents,showStudent,showStudentsAPI,showStudentAPI,showEdit,showDelete,addStudent,editStudent} = require('../controller/controllers')

Router.get('/',showHome)
Router.get('/about',showAbout)
Router.get('/contact',showContact)
Router.get('/add-student', showAdd)
Router.get('/students', showStudents)
Router.get('/students/:id', showStudent)
Router.get('/api/students',showStudentsAPI)
Router.get('/api/students/:id',showStudentAPI)
Router.get('/student/:id/edit',showEdit)
Router.get('/student/:id/delete',showDelete)
Router.post('/v1/students',addStudent)
Router.post('/students/edited/:id',editStudent)


module.exports = Router