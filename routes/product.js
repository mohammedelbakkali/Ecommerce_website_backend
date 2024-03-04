const express = require('express')
const router = express.Router();
const productController = require('../controllers/product')
const auth = require('../middlewares/auth')
const userById =require('../middlewares/user')


const {uploadSingleFile} = require('../helpers/uploadSingleFile')


router.route('').post(uploadSingleFile('public/product','photo'),productController.addProduct)
                 .get(productController.getAllProduct)
router.route('/:id').get([auth.requireSignIn,auth.isAuth,auth.isAdmin],productController.getProductById)
router.route('/:id').patch([auth.requireSignIn,auth.isAuth,auth.isAdmin],productController.updateProduct)
                     .delete([auth.requireSignIn,auth.isAuth,auth.isAdmin],productController.deleteProduct)              

router.param('userId',userById)
module.exports = router;