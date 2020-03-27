const Student = require('../models/Student')
const showHome = (req,res) => {
    res.render('pages/index')
}
const showAbout = (req,res) =>{
    res.render('pages/about')
}
const showContact = (req,res) =>{
    res.render('pages/contact')
}
const showAdd = (req,res) => {
    res.render('pages/addStudent')
}
const showStudents = (req,res) => {
    Student.find({},(err,students) => {
        if(err) return res.status(404).send('Not found')
        res.render('pages/students', {students})
      })
}
const showStudent = (req,res) => {
    const id = req.params.id
    Student.findOne({_id : id},(err,student) => {
      if(err) return res.status(404).send('Not found')
      res.render('pages/student',{student})
    })
}
const showStudentsAPI = (req,res) => {
    Student.find({},(err,students) => {
        if(err) return res.status(404).send('Not found')
        res.send(students)
      })
}

const showStudentAPI = (req,res) =>{
    const id = req.params.id
    Student.findOne({_id : id},(err,student) => {
    if(err) return res.status(404).send('Not found')
    res.send(student)
    })

}

const showEdit= (req,res) => {
    let id = req.params.id
    Student.findOne({_id : id},(err,student) => {
      if(err) return res.status(404).send('Not found')
      res.render('pages/editStudent',{student})
    })

}
const showDelete= (req,res) => {
    const id = req.params.id
    Student.deleteOne({_id : id},(err,student) => {
      if(err) res.status(404).send('Not found')
      res.redirect('/students')
    })
}

const addStudent= (req,res) => {
    req.body.skills = req.body.skills.split(', ')
    const newStudent = new Student(req.body)
    newStudent.save(err => {
      if(err) return res.status(404).send('Not found')
      res.redirect('/students')
    })
}
 
const editStudent= (req,res) => {
    const id = req.params.id
    req.body.skills = req.body.skills.split(', ')
    const {firstName,lastName,country,age,skills} = req.body
    Student.findOne({_id : id}, (err,student) => {
      if(err) return res.status(404).send('Not found')
      student.firstName = firstName
      student.lastName = lastName
      student.country = country
      student.age = age
      student.skills = skills
      student.save(err => {
        if(err) return res.status(404).send('Not found')
        res.redirect(`/students/${student._id}`)

      })
    })

}

module.exports = {
    showHome : showHome,
    showAbout : showAbout,
    showContact : showContact,
    showAdd : showAdd,
    showStudents : showStudents,
    showStudent : showStudent,
    showStudentsAPI : showStudentsAPI,
    showStudentAPI : showStudentAPI,
    showEdit : showEdit,
    showDelete : showDelete,
    addStudent : addStudent,
    editStudent : editStudent
}