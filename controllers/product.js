

const Product = require('../models/product');
const fs = require('fs')

const addProduct = async (req,res)=>{
   try{

      const objet = await new Product(req.body);
      console.log(req.body)
      const instance =await objet.save();
      console.log(instance)
      res.status(200).json({instance})

     }catch(exception){
      res.send(exception).status(400);
     }

}

const getProductById = async (req,res)=>{
              try{
                 const dataRecu =await Product.findById(req.params.id);
                 res.status(200).json({dataRecu})
              }catch(exception){
                  res.send(exception).status(404)
              }
}

const getAllProduct = async (req,res)=>{
               try{
                  const data =await Product.find();
                  res.json(data).status(200)
               }catch(exception){
                  res.send(exception).status(404)
               }
}

const updateProduct = async (res,req)=>{
               try{
                  const data =await Product.findByIdAndUpdate({_id:req.params.id} , req.body , {new:true})
                  res.json({data}).status(200)
               }catch(exception){
                 console.log(exception)
               }

}

const deleteProduct = async (req,res)=>{
             try{
                const data = Product.findByIdAndDelete({_id:req.params.id})
                res.json(data).status(200)
             }catch(exception){
                res.json(exception).status(404)
             }
}


module.exports = {addProduct,getProductById,getAllProduct,updateProduct,deleteProduct}



// new animal(req.body)
