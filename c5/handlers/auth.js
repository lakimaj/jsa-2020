const validate = require('../pkg/user/validation');
const user = require('../pkg/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var config = require('../pkg/config');

const register = (req, res) => {
    validate.register(req.body)
        .then(matches => {
            console.log(matches);
            if (!matches) {
                throw {message: 'Bad request', code: 400};
            }
            if (req.body.password !== req.body.password2) {
                throw { message: 'Bad request', code: 400 };
            }
            console.log('Email is '+req.body.email);
            return user.getUserByEmail(req.body.email);
        })
        .then(u => {
            console.log('User is '+u);
            if (u !== null) {
                throw { message: 'Conflict error', code: 409 };
            }
            
            req.body.password = bcrypt.hashSync(req.body.password);
            console.log(req.body);
            return user.createUser(req.body);
        })
        .then(() => {
            res.status(201).send('created');
        })
        .catch(err => {
            let code = err.code === undefined ? 500 : err.code;
            res.status(code).send(err.message);
        });
};

const login = (req, res) => {
    validate.login(req.body)
        .then(matches => {
            if (!matches) {
                throw { message: 'Bad request', code: 400 };
            }
            return user.getUserByEmail(req.body.email);
        })
        .then(u => {
            if (u === null) {
                throw { message: 'Bad request', code: 400 };
            }
            if (!bcrypt.compareSync(req.body.password, u.password)) {
                throw { message: 'Bad request', code: 400 };
            }
            let payload = {
                name: `${u.first_name} ${u.last_name}`,
                email: u.email,
                iat: parseInt(new Date().getTime()/1000)
            };
            let token = jwt.sign(payload, config.get('server').key);
            res.status(200).send({token: token});
        })
        .catch(err => {
            res.status(err.code).send(err.message);
        });
};

const logout = (req, res) => {
    res.status(200).send('ok');
};

const refresh = (req, res) => {
    res.status(200).send('ok');
};

module.exports = {
    register,
    login,
    logout,
    refresh
};