const mongoose = require('mongoose');


const {v4: uuidv4} = require('uuid');
const crypto = require('node:crypto');

const userSchema = mongoose.Schema({
    firstName:{
             type: String,
             trim:true,
             maxlength:50,
             required:true
        } ,
        lastName:{
            type: String,
            trim:true,
            maxlength:50,
            required:true
        },
        email: {
            type:String,
            trim:true,
            maxlength:100,
            required:true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            unique:true
        },
        hashed_paasword:{
            type:String,
            maxlength:100

        }  ,
        salt:{
            type:String
        },
        about:{
            type:String,
            trim:true
        },
        role:{
            type:Number,
            default:0
        },
        history:{
            type: Array,
            default:[]
        }

},{timestamps:true})


userSchema.virtual('password') //champs virtual
 .set(function(password){
      this._password=password; // creé nouveau attribut _password
      this.salt =uuidv4(); // lachine unique
      console.log("slat :", this.salt);
      this.hashed_paasword=this.cryptPassword(password);
}).get(function(){
     return _password;
})

userSchema.methods ={ 
    Declanche :function() {
  console.log(`Hello, ${this.name}`);
},
   message : function(a){
       console.log(`declanche la fonction ${a}`)
   }
}

userSchema.methods = {

        authenticate : function(plainText) {

            return this.cryptPassword(plainText)===this.hashed_paasword;
          },

          cryptPassword : function(password){
            if(!password) return '';
            try{
                return  crypto.createHash('sha256',this.salt)
                            .update(password)
                               .digest('hex');
                              
            }catch(exception){
                   return '';
            }
         
        }
}



module.exports = mongoose.model('User',userSchema);

//backEND = log : php or javascript(nodejs (env d'execution de javascript au niveau serveur) , express (fram))