const {create, createImg, update, updateimages} = require('./../models/empleados')
const {imgFile} = require('./../utils/fileHandler')


const createEmpleados = async(body, file) => {
try {
const {insertId : id_empleados} = await create(body)
const uid = imgFile(file);
const obj = { id_empleados , uid};
const {insertId : idImg} = await createImg(obj)
return idImg;

}catch (error) {
    console.error(error);
}
}


const updateEmpleados = async(body, file, id) => {
    try {
    const id_empleados = await update(body, id)
    if(file){
    const uid = imgFile(file);
    const obj = { uid};
    const  idImg = await updateimages(id,obj)
    return idImg;
            }
    else{ return id_empleados }
    }catch (error) {
        console.error(error);
    }
    }
    


module.exports = {createEmpleados, updateEmpleados}
