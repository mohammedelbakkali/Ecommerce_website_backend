
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const signup = async (req,res)=>{
    const user =await new User(req.body);
    user.save((err,user)=>{
         if(err) return res.send(err).status(400)
         res.send(user)
    });
}

//La clé secrète est utilisée pour chiffrer et déchiffrer le jeton d'authentification

const signin = (req,res)=>{
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
         if(err || !user)  {
             return res.status(400).json({error :'user not found with this email , Please SingUp !'})
         }else{
            if(!user.authenticate(password)){
                return res.status(401).json({
                    error:'Email and password dont Match !'
                })
            }else {
             const token =  jwt.sign({_id:user._id , role:user.role},process.env.JWT_SECRET); //_id envoie dans payload
             res.cookie('token',token,{expire:new Date +802051})
             const {_id,lastNamen,firstName,role}=user;
           return  res.json({
                token,user:{_id,lastNamen,firstName,role}
             })
            }
         }
    })
}

const signout = (req,res)=>{
     res.clearCookie('token');
     res.json({message : "user signout !"})
}

module.exports = {signup,signin,signout}