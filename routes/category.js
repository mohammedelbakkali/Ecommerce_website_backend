const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/category')
const auth = require('../middlewares/auth')
const userById =require('../middlewares/user')

router.route('/:userId').post([auth.requireSignIn,auth.isAuth,auth.isAdmin],categoryController.addCategory)
                 .get(categoryController.getAllCategory)
router.route('/:id').get([auth.requireSignIn,auth.isAuth,auth.isAdmin],categoryController.getCategoryById)
                     .patch([auth.requireSignIn,auth.isAuth,auth.isAdmin],categoryController.updateCategory)
                     .delete([auth.requireSignIn,auth.isAuth,auth.isAdmin],categoryController.deleteCategory)  

router.param('userId',userById) // middleware va execute avnat de controller
//on va fair ca : pour vérifier et compare id de user avec id qui existe dans le token !!
module.exports = router;