const pool = require('./../utils/bd')

const getTodos = () => {
    const query = "SELECT * FROM ??"
        const params = [process.env.T_EMPLEADOS];
        return  pool.query(query, params);
};
const create = (obj) => 
pool.query("INSERT INTO ?? SET?",[process.env.T_EMPLEADOS,obj]).then(response => response).catch(err => console.error(err));

const createImg  = (obj) => 
pool.query("INSERT INTO ?? SET ?",[process.env.T_EMPLEADOSIMG,obj]).then(response => response)
.catch(err => console.error(err));

const getsingle = (id)=>{
    try {
    pool.query("SELECT e.id , e.nombre, e.apellido, e.telefono , e.direccion ei.uid FROM ?? as e JOIN ?? as ei on e.id = ei.id_empleados WHERE e.eliminado = 0 AND e.id = ?",[process.env.T_EMPLEADOS,process.env.T_EMPLEADOSIMG, id]).then(response => response);
   }catch(error){
       console.error(error);
   }
};
const deleteEmp = async(id)=>{   
     try {
    pool.query("UPDATE ?? SET eliminado = 1 WHERE id = ?",[process.env.T_EMPLEADOS,id]).then(response => response);
  
   }catch(error){
       console.error(error);
   }
};
const deleteEmpImg = async(id)=>{   
    try {
   pool.query("UPDATE ?? SET eliminado = 1 WHERE id = ?",[process.env.T_EMPLEADOSIMG,id]).then(response => response);
  }catch(error){
      console.error(error);
  }
};
const getUpdates = async()=>{
    try {
    pool.query("SELECT e.id , e.nombre, e.apellido, e.telefono , e.direccion ei.uid FROM ?? as e JOIN ?? as ei on e.id = ei.id_empleados WHERE e.eliminado = 0",[process.env.T_EMPLEADOS,process.env.T_EMPLEADOSIMG]).then(response => response);
   }catch(error){
       console.error(error);
   }
};
  
const update = async(obj ,id )=>{   
    try {
        pool.query("UPDATE ?? SET ? WHERE id = ?",[process.env.T_EMPLEADOSIMG,obj,id]).then(response => response);
       }catch(error){
           console.error(error);
       }
};
const updateimages = async(obj,id )=>{   
    try {
        pool.query("UPDATE ?? SET ? WHERE id = ?",[process.env.T_EMPLEADOSIMG,obj,id]).then(response => response);
       }catch(error){
           console.error(error);
       }
};

module.exports = { create, createImg, getsingle, deleteEmp,deleteEmpImg, getUpdates, update,updateimages, getTodos }