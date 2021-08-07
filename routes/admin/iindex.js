const express = require('express')
const router = express.Router()

const showiindex = (req,res) =>  {res.render('iindex');

if (req.session.user){
    res.render('iidenx')
}
res.render('login', {message : 'inicie sesion'} )


}

router.get('/', showiindex)
module.exports = router;