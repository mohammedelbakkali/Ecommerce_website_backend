const User = require('../models/user')

const userById = (req ,res,next, id)=>{
     User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(404).json({error:"user not found"})
        }
        req.profile=user;
        next();
     })
}

module.exports = userById;