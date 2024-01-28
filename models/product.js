
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name for the product'],
        maxlength:[32,"Name can't be more than 32 characters"],
        trim: true,
    },
    reference:{
        type:String,
        unique: true,
        required: [true, 'A reference is required'],
        maxlength:19,
        trim: true,
    },
    price:{
        type:Number,
        required: [true, "Price field cannot be empty"],
        min:0,
        default:0,
    },
    description:{
        type: String,
        //required:true,
    },
    image:{
        type:String,
    },
    categeory:{
        type : mongoose.Types.ObjectId ,
        ref:'Category',
        required:[false,'Product must belong to a category'],
    },
    contentType: {
        type: String, // store the content type (e.g., 'image/jpeg') here
      },
    Availability:{
        type:Boolean,
        required:true,
    },
    quantity:{
        type: Number,
        required: true,
        default:0
    },
    favorite:{
        type : Boolean ,
        default : false 
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('ProductSchema',productSchema)