const express = require('express')
const userController = require('../controllers/Auth')
const router = express.Router();
const {validation,userSignUpvalidator}=require('../middlewares/userValidator')
const {requireSignIn , isAuth } =require('../middlewares/auth')


router.route('/signup').post(validation,userSignUpvalidator,userController.signup)
router.route('/signin').post(userController.signin)
router.route('/signout').get(userController.signout)

router.get("/hello", requireSignIn ,(req,res)=>{
    res.send('hello') 
})

// vérifier le token de profile

module.exports = router;