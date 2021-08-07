const pool = require('./../utils/bd');


const getAll = () => {
    const query = "SELECT * FROM ??"
        const params = [process.env.T_USUARIOS];
        return  pool.query(query, params);
};
const getSingle= async(id) => {
    const query = 'SELECT * FROM ?? WHERE id = ?';
    const params = [process.env.T_USUARIOS,id]
    return pool.query(query, params)
};
const crear = async (obj) => {
    const query = 'INSERT INTO ?? SET ?';
    const params = [process.env.T_USUARIOS,obj];
    return await pool.query(query, params);
};
const verify = async (uid) => {
    const query = 'UPDATE ?? SET habilitado = 1 WHERE ConfirmacionCorreo = ?'
    const params = [process.env.T_USUARIOS,uid]
    return await pool.query(query, params);
};
const login = async (username, pass) => {
    const query = 'SELECT * FROM ?? WHERE username=? AND pass=?'; 
    const params = [process.env.T_USUARIOS,username,pass];
    return await pool.query(query, params);
};
const auth = async (username, pass) => {
    const query = 'SELECT * FROM ?? WHERE username = ? AND pass = ? AND admin = 1'
    const params = [process.env.T_USUARIOS,username,pass];
    return await pool.query(query, params);
};
const update = async (obj,id) => {
    const query = 'UPDATE ?? SET = ? WHERE id = ?';
    const params = [process.env.T_USUARIOS,obj,id]
    return await pool.query(query, params);
}

module.exports = {getAll, getSingle, crear, verify, login, auth, update}