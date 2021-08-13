  
const express = require('express');
const router = express.Router();
const model = require('./../models/usuarios');
const sha1 = require('sha1');
const {v4: uuid} = require('uuid');
const { send } = require('./../services/mail')
const {validateRegistro} = require('./../middlewares/usurios');

const showRegistro = (req, res) => {
    res.render('registro');
}
const create = async (req, res) => {
    const usuarios = req.body;
    console.log(usuarios);
    let duplicado = false;
    const uid = uuid();
    console.log(uid)
    const usuarioFinal = { //usuario que voy a pasar a la BDD
        username: usuarios.username,
        Apellido: usuarios.Apellido,
        pass: sha1(usuarios.pass),
        mail: usuarios.mail,
        confirmacionCorreo: uid,
    }
    
    const usuariosExistentes = await model.getAll();
    usuariosExistentes.forEach(usuarios => {
        if (usuarios.username == usuarioFinal.username || usuarios.mail == usuarioFinal.mail) duplicado = true;
    })
    if (!duplicado) {
        const agregado = await model.crear(usuarioFinal);
        console.log(agregado);
        send({
            mail : usuarioFinal.mail, 
            cuerpo:
            `<h1> Bienvenido ${usuarioFinal.username}</h1>
            <a href="${process.env.URL_SERVER}:${process.env.PORT}/registro/verify/${usuarioFinal.confirmacionCorreo}">Link magico</a>`,
            });
        res.redirect('/productos');
    }
    else {
        res.render('registro', {message : "el nombre de usuario y/o mail ingresado ya extisten"})
    }
}
const verify = async(req, res) => {
    const {uid} = req.params;
    console.log(uid);
    const messageId = await model.verify(uid);
    res.redirect('/productos');
}
router.get('/', showRegistro);
router.post('/',validateRegistro, create);
router.get('/verify/:uid', verify);
module.exports = router;