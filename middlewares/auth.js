
const verifyUser = (req, res, next) => {
    if (req.session.user){
        next();
    }else{
        res.render('login',{message: 'nesecitas logearte para acceder'});
        }
} 
const verifyAdmin = (req, res, next) => {
    if (req.session.admin == 1){
        next();
    }else{  res.render('unathorized',{message: 'nesecitas logearte para acceder'});

         }
}
module.exports = {verifyUser,verifyAdmin  };