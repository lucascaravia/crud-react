const express = require('express');
const router = express.Router()
const model = require('./../../models/productos')

const get = async (req, res)=> {
    const productos = await model.getAll();
    res.render('/admin/adminProductos',{productos});
}
const showcreate = async (req, res) => {
    const categorias = await model.getAll();
    console.log(categorias);
    res.render('createProducto',{productos});
}
const create = async (req, res)=> {
    const producto = req.body;
    console.log(producto);
    const insterId = await model.create(producto); 
    console.log(insterId);
    res.redirect('/admin/adminProductos')
}
const del = async (req, res)=> {
    const {id} = req.params;
    const {insterId} = await model.delete(id);
    console.log( insterId);
    res.redirect('/admin/adminProductos');
}    
const update = async (req, res)=> {
    const {id} = req.params;
    const producto = req.body;
    console.log(producto);
    const {insertId} = await model.update(id, producto);
    console.log(insertId);
    res.redirect('/admin/adminProductos');
    }
const showUpdate = async (req, res)=> {
    const [producto] = await model.Singleget(id);
    console.log( producto)
    const {id} = req.params;
    console.log(category)
    res.render('updateProducto',{productos});
}
router.get('/',get)
router.get('/create',showcreate) 
router.post('/create',create)
router.get('/update/:id',showUpdate) 
router.post('/update/:id',update)
router.get('/delete/:id',del)
module.exports = router