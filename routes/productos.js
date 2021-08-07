const express = require('express')
const router = express.Router();
const model = require('./../models/productos');

const all = async (req,res) => {
const productos= await model.getAll()
console.log(productos)
res.render('productos',{productos});
}

const single = async (req, res)=>{
    const {id}= req.params.id;
    const [productos] = await getSingle(id);
console.log(productos,id)
    res.render( 'producto', {productos})
}
const create = async (req,res) => {
    const {body: productos} = req;
    const messsageid = await crearProducto( productos);
    console.log(messsageid);
    res.redirect("/")
}
const crearProducto = async (req,res) =>{
    res.render('createProductos',);
}
const buscador = async(req, res) => {
    let {aBuscar} = req.body;
    aBuscar = '%' + aBuscar + '%';
    const productos = await getNombre(aBuscar);
    console.log(productos);
    res.render('productos', {productos});
}

router.get('/',all);
router.get('/single/id', single);
router.post('/create', create);
router.get('/create', crearProducto);
router.post('/', buscador)




module.exports = router;