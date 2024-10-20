const mongoose=require('mongoose')
const userValidators=require('../validators/user')
const schema=new mongoose.Schema({
    userImg:{
        type:String,
        required:true
    },
    backgroundImg:{
        type:String,
        require:true
    },
    firsname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tell:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true})

schema.statics.userValidation = function (body) {
    return userValidators.validate(body, { abortEarly: false });
};

const model=mongoose.model('User',schema)
module.exports=model