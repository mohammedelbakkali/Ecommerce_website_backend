var { expressjwt: jwt } = require("express-jwt");  //qui permet de  vérifier et lir le Token
require('dotenv').config()

// jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] })
const requireSignIn = jwt({ secret :process.env.JWT_SECRET, algorithms:["HS256"] , userProperty:'auth'}) // auth les information dans pyload

const isAuth = (req,res,next)=>{
    if(req.auth.role==1){
        return next();
    }
     let user = req.profile && req.auth && (req.profile._id == req.auth._id);
     if(!user) {
      return  res.status(403).json(({
            error : "Access Denied"
        }))

     }

     next()
}

const isAdmin = (req,res,next)=>{
     if(req.auth.role==0){
        return res.status(403).json({
            error : "Admin Resource , Access Denied !"
        })
     }
     next()
}


module.exports = {requireSignIn , isAuth , isAdmin};