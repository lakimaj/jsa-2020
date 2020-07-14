const e = require("express");

var students = [
    {id: 1, fname: 'Pero', lname: 'Perovski', gpa: 6.1},
    {id: 2, fname: 'Janko', lname: 'Perovski', gpa: 9.1},
    {id: 3, fname: 'STanko', lname: 'Perovski', gpa: 7.0},
]
//primer za niza objekt nov test

const getAllStudents = (req, res) => {
    return res.status(200).send(students);
}

const getSingleStudent = (req, res) => {
    if(students[req.params.id] !== undefined){
        return res.status(200).send(students[req.params.id]);
    }
    return res.status(404).send('Not found');
};

const createStudent = (req, res) => {
    if(req.body){
        students.push(req.body);
    return res.status(201).send('Created New User');
    }
    return res.status(404).send('Bad request');
};

/* const removeStudent = (req , res) =>{
    const found = students.findIndex((student) =>{
        student.id === req.params.id
    })
    if (found) {
        students.splice(found, 1)
        res.status(200).json("Succesfully deleted")
    }
    else{
        res.status(400).json('Bad request, no data found!')
    }
} */
// **************** OD BOJAN so FILTER ********************
const removeStudent = (req , res) => {
    students = students.filter((e, i) => {
        return e.id != parseInt(req.params.id);
    });
    res.status(204).send();
};

/* const updateStudent = (req, res) => {
    if(data.students[req.params.id] != undefined){
        if(req.body.fname !== undefined && req.body.lname !== undefined && req.body.gpa !== undefined) {
            let student = {
                fname: req.body.fname,
                lname: req.body.lname,
                gpa: req.body.gpa
            };
            data.students[req.params.id] = student;
                return res.status(200).send("Ok");
                }
        else {
            return res.status(400).send("Bad request");
            }
        }
        else {
            return res.status(404).send("Not Found");
        }
} */
// ************** OD BOJAN so MAP ******************** bez validacija
const updateStudent = (req, res) => {
    


// ************** OD BOJAN so MAP ******************** 
const patchStudent = (req, res) => {
    res.status(200).send('ok');
}

module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudent,
    removeStudent,
    updateStudent,
    patchStudent
};