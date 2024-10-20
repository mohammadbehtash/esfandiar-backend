const mongoose=require('mongoose')
const loginValidators=require('../validators/auth')

const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})



schema.statics.loginValidation = function (body) {
    return loginValidators.validate(body, { abortEarly: false });
};

const model=mongoose.model('Auth',schema)
module.exports=model