
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: false,
        maxlength:[32,"Name can't be more than 32 characters"],
        trim: true,
    },
    reference:{
        type:String,
        unique: true,
        required: false,
        maxlength:19,
        trim: true,
    },
    price:{
        type:Number,
        required: false,
        min:0,
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
        type: String, 
      },
    Availability:{
        type:Boolean,
        required: false,
    },
    quantity:{
        type: Number,
        required: false,
    },
    favorite:{
        type : Boolean ,
        default : false 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
    firstName:{
        type:String,
        required: false,

        trim: true,
    },
    lastName:{
        type:String,
        required:false,
        default:"",
        trim: true,
    },
    email:{
        type: String,
        unique : true ,
        lowercase : true ,
        trim : true ,
        required: false,
    },
    password:{
        type:String,
        required:false,
        minlength :[8,'Your password must be at least 8 characters'],
    },
    role:{
        type:String,
        default:'user',
        enum:['admin','user']
    },
    address:{
        type:String,
        required: false,
    },
    phoneNumber:{
        type:Number,
        required:false
    },
    city:{
        type:String,
        required: false
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('ProductSchema',productSchema)