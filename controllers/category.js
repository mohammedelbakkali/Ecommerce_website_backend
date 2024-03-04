
const Category = require('../models/category');


const addCategory =async (req,res)=>{

       try{

        const objet = await new Category(req.body);
        const enregistreCategory =await objet.save();
        res.status(200).json({enregistreCategory:enregistreCategory})

       }catch(exception){
        res.send(exception).status(400);
       }

}

const getCategoryById = async (req,res)=>{
              try{
                 const dataRecu =await Category.findById(req.params.id);
                 res.status(200).json({dataRecu})
              }catch(exception){
                  res.send(exception).status(404)
              }
}

const getAllCategory = async (req,res)=>{
               try{
                  const data =await Category.find();
                  res.json(data).status(200)
               }catch(exception){
                  res.send(exception).status(404)
               }
}

const updateCategory =async (res,req)=>{
               try{
                  const data = category.findByIdAndUpdate({_id:req.params.id} , req.body , {new:true})
                  res.json({data}).status(200)
               }catch(exception){
                res.send(exception).status(404)
               }
}

const deleteCategory = async (req,res)=>{
             try{
                const data = Category.findByIdAndDelete({_id:req.params.id})
                res.json(data).status(200)
             }catch(exception){
                res.json(exception).status(404)
             }
}


module.exports = {addCategory,getCategoryById,getAllCategory,updateCategory,deleteCategory}