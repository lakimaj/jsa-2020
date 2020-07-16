const validate = require('../pkg/user/validation');
const user = require('../pkg/user');
const bcrypt = require('bcrypt-node')

const register = (req, res) => {
    validate.register(req.body)
    .then(matches => {
        if (!matches) {
            res.status(400).send('bad request');
            throw 'Bad request';
        }
        if (req.body.password !== req.body.password2) {
            res.status(400).send('bad request');
            throw 'Bad request';
        }
        return user.getUserByEmail(req.body.email)
    })
    .then(u => {
        if(u !== null) {
            res.status(409).send('conflict');
            throw 'Conflict';
        }
        req.body.password = bcrypt.hashSync(req.body.password);
        return user.createUser(req.body);
    })
    .then(() => {
        res.status(201).send('created');
    })
    .catch(err => {
        res.status(500).send('internal server error');
    });
};

const login = (req, res) => {
    res.status(200).send('ok');
}

const logout = (req, res) => {
    res.status(200).send('ok');
}

const refresh = (req, res) => {
    res.status(200).send('ok');
}


module.exports = {
    register,
};