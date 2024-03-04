const express = require('express')
const router = express.Router()

const {getOneUser}=require('../controllers/userController')
const userById =require('../middlewares/user')
const {requireSignIn , isAuth ,isAdmin } = require('../middlewares/auth')
router.get('/profile/:userId',requireSignIn,isAuth,getOneUser)

router.param('userId',userById) // middleware va execute avnat de controller

// router.param(name, function)

// req – the request object
// res – the response object
// next – the next middleware function
// id – the value of name parameter


module.exports = router