const express = require('express')
const router = express.Router()

const showiindex = (req,res) =>  {res.render('admin/adminIndex');

if (req.session.user){
    res.render('admin/adminIndex')
}
res.render('login', {message : 'inicie sesion'} )
console.log(error)

}

router.get('/', showiindex)
module.exports = router;