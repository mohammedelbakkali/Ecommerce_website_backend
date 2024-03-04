
const multer = require('multer');
const path = require('path')
const fs = require("fs");

module.exports.uploadSingleFile = (destinationFolder,filedname) => {
    let dest = '.' + destinationFolder
    return (req, res, next) => {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
                cb(null, dest);
            },
            filename: function (req, file, cb) {
                cb(null, "1_" + file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        });

        const upload = multer({ dest: './public/data/uploads/' }).single(filedname);

        upload(req, res, async (err) => {
            if (err) {
                res.status(400).send({ msg: "Something went wrong during file upload!", error: err });
            }
            else{
                if(req.file)
                console.log("req.file: ",req.file)
                req.body[req.file.fieldname] = JSON.stringify(destinationFolder + '/' + req.file.filename)
                console.log(req.file.fieldname)
                // await this.parseData(req)
               
                next();
            }
           
        });
    }


};

module.exports.parseData = (req, res, next) => {
    let keys = Object.keys(req.body); // cette fonction return la table des keys 
    console.log(req.body)
    for (let key in keys) {
        if (req.body[keys[key]]) {
            req.body[keys[key]] = JSON.parse(req.body[keys[key]]);
        }
    }
    // console.log(keys)
};