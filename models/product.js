const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema;


// Schema = model = chema 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxLength: 150,
        trim: true,
        required:true
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    photo: {
               type:String
    },
    category: {
        type: ObjectId,
        ref: 'Category',
    },
    shipping: {
        type: Boolean,
     
        default: false
    } 
}, {timestamps: true})


module.exports = mongoose.model('Product',productSchema)