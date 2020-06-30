const students = [
    {fname: 'Pero', lname: 'Perovski', gpa: 6.1},
    {fname: 'Janko', lname: 'Perovski', gpa: 9.1},
    {fname: 'STanko', lname: 'Perovski', gpa: 7.0},
]

const getAllStudents = (req, res) => {
    return res.status(200).send(students);
}

const getSingleStudent = (req, res) => {
    if(students[req.param.id] !== undefined){
    return res.status(200).send(students[req.param.id]);
    }
    return res.status(404).send('Not found');
};

const createStudent = (req, res) => {
    if(req.body){
        students.push(req.body);
    res.status(201).send('Created');
}
return res.status(404).send('Bad request');
};

const removeStudent = (req, res) => {
    res.status(200).send('ok');
}

const updateStudent = (req, res) => {
    res.status(200).send('ok');
}

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