// module.exports.parseData = (req, res, next) => {
//     let keys = Object.keys(req.body); // cette fonction return la table des keys 
//     for (let key in keys) {
//         if (req.body[keys[key]]) {
//             req.body[keys[key]] = JSON.parse(req.body[keys[key]]);
//         }
//     }
// };

const path = require('path')

const text = '{"nom":"bakkali", "prenom":"mohammed", "age":84, "niveau":"ingénieur"}  ';
// let keys = Object.keys(text);
const myArr = JSON.parse(text);
let keys = Object.keys(myArr);

// console.log(keys) // table les keys
// for(let key in keys){
//     console.log(myArr[keys[key]])
// }

console.log(path.extname(__filename))
