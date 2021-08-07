const express = require('express');
const router = express.Router();
const {auth} = require('./../models/usuarios')
const sha1 = require('sha1');
const {validatelogin} = require('./../middlewares/usurios');

const showLogin = (req, res) => res.render('login');

const login = async (req, res) => {
    let {username, pass} = req.body;
    pass = sha1(pass);
    const logged = await auth(username, pass);
    if (logged.length === 0) {
        res.render('login', {message: 'Usuario o pass incorrectos'});
    }
    else {
        const [{id, admin}] = logged;
        req.session.user = id;
        req.session.admin = admin;
        res.redirect('/usuarios');

    }
}

router.get('/', showLogin);
router.post('/', validatelogin, login);
module.exports = router;