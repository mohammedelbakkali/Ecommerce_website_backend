


const {check , validationResult } = require('express-validator')

const validation =  [   
    check('firstName','firstName is Required').notEmpty().isLength({min:3,max:10}).trim(),
    check('lastName', 'lastName is Required').notEmpty().isLength({min:3,max:10}).trim(),
    check('email').isEmail().notEmpty().trim().normalizeEmail(),
    check('password').notEmpty().isLength({min:8,max:10}).withMessage('password must between 8 end 10 caracters')
                             ]
   
const userSignUpvalidator=(req,res,next)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }else{
        next();
      }
    
}

module.exports = {validation,userSignUpvalidator}