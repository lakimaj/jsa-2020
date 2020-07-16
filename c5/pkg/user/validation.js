var validator = require('node-input-validator');

const registerSchema = {
    first_name: 'reqired||minlength:2',
    last_name: 'reqired||minlength:2',
    email: 'reqired|email',
    password: 'reqired|minlength:1',
    password2: 'reqired|minlength:1'
};

const loginSchema = {
    email: 'reqired|email',
    password: 'reqired|minlength:1'
}; 

const register = (data) => {
    let v = validator.Validator(data, registerSchema);
    return v.check();
}

const login = (data) => {
    let v = validator.Validator(data, loginSchema);
    return v.check();
}

module.exports = {
    register,
    login
}