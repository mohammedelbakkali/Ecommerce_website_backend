const multer = require('multer')
const path = require('path')
const fs = require('fs');

exports.uploadSingleFile=(destinationFolder,fieldname)=>{
     return (req,res,next)=>{

        const repDes =""+destinationFolder;
        //================= creation de storage ========================
        const storage = multer.diskStorage({
           
             destination : function(req,file,callback){
                if(!fs.existsSync(repDes)) {
                     fs.mkdirSync(repDes,{recursive:true})
                }
                callback(null,repDes)
             },
             filename : function(req,file,callback){
                callback(null, "1_" + file.fieldname + "-" + Date.now() + path.extname(file.originalname))
             }
        })
        //=============================================================

        const upload = multer({storage:storage}).single(fieldname);
        // upload(req, res, function (err) )
         upload(req,res,async(err)=>{
              if(err){
                 res.json(err).status(400);
              }else{
                 if(req.file){
                    // req.body[req.file.fieldname]=JSON.stringify(destinationFolder + '/' + req.file.filename)
                    req.body[req.file.fieldname] = JSON.stringify(destinationFolder + '/' + req.file.filename)
                    await this.parseData(req)
                     next()
                 }
              }  
         });

     } 



}

module.exports.parseData = (req) => {
    let keys = Object.keys(req.body); // cette fonction return la table des keys 
    // [ 'name', 'description', 'price', 'category', 'photo' ]

   req.body.photo=JSON.parse(req.body[keys[4]])
  
 
};