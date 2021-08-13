const pool = require("./../utils/bd")

 const getAll = async() => {
        const query = "SELECT * FROM ??  WHERE eliminados = 0";
        const params = [process.env.T_PRODUCTOS];
      return await pool.query(query, params);
    } 
    
    const Singleget= async(id) => {
        const query = 'SELECT nombre, id, catgoria FROM ?? WHERE eliminados = 0'
        const params = [process.env.T_PRODUCTOS,id]
        return await pool.query(query, params);
    }
    const crearProducto = async (obj) => {
        const query = 'INSERT INTO ?? SET ?';
        const params = [process.env.T_PRODUCTOS,obj];
        return await pool.query(query, params);

    }
    const categoria = async () => {
        const query = 'SELECT categorias FROM ?? '
        const params = [process.env.T_PRODUCTOS]
        return await pool.query(query, params);
    }
    const del = async(id) => {
        const query = "UPDATE ?? SET eliminados = 1 WHERE id = ?";
        const params = [process.env.T_PRODUCTOS, id];
        return await pool.query(query, params);
    }

    module.exports = {getAll, Singleget,crearProducto,categoria, del}