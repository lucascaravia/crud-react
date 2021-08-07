const express = require('express');
const router = express.Router();
const {getAll,getSingle, crear, edit} = require('./../models/usuarios')

const getTodos = async (req, res ) =>{
    const usuarios = await getAll();
    res.render('usuarios',{usuarios})
}

const single = async (req, res)=>{
    const id = req.params.id;
    const [usuarios] = await getSingle(id);
console.log(usuarios,id)
    res.render( 'usuario', {usuarios})
}

const registro = async (req, res) =>{
    const nuevoUsuario= req.body;
    const {insertID} = await crear(nuevoUsuario);
    console.log(insertID);
    res.redirect('usuarios');
}

const showregistro =(req, res) => {
   
    res.render('createUsuario');
}

const updateUsuario =(req, res) => {
    res.end();
}
router.get('/', getTodos);
router.get('/single/:id', single);
router.get('/regitro', showregistro);
router.post('/regitro', registro);
router.get('/single/:id',updateUsuario)

module.exports = router;