const express = require('express')
const router = express.Router();
const multer = require('multer');
const config = {dest:'./public/tmp'};
const upload = multer(config);
const model = require('./../../models/empleados')
const services = require('./../../services/empleados')

const create = async (req, res) => {
    const idImg = await services.createEmpleados(req.body, req.file)
    console.log(req.file);
    res.redirect('admin/adminEmpleados')
}
const todos = async (req, res) => {
    const empleados = await model.getTodos()
    console.log(empleados);
res.render('adminEmpleados',{empleados}) 
}
const del = async (req, res) => {
    const {id} = req.params;
    const messageEmp = await models.deleteEmp(id)
    const messageEmpImg = await models.deleteEmpImg(id)
    res.redirect('admin/adminEmpleados')
}
const getUpdate = async (req, res) => {
    const [empleados] = await model.getsingle(req.params.id);
    res.render('empleadosUpdate',{empleados})
}
const update= async (req, res) =>{
    const idImg = await services.UpdateEmpleados(req.params.id , req.body, req.file);
    console.log(req.file, req.body);
    res.redirect('admin/adminEmpleados')
}
router.get('/',todos);
router.post('/create',upload.single("imagen"),create);
router.get('/create',(req, res)=> res.render('createEmpleados'));
router.get('/delete/:id',del);
router.get('/update/:id',getUpdate);
router.post('/update/:id',upload.single("imagen"),update);
module.exports = router;
