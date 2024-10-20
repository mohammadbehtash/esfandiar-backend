const mongoose=require('mongoose')
const SharedValidators=require('../validators/shared')
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:true
    }
},{timestamps:true})

schema.statics.SharedValidation = function (body) {
    return SharedValidators.validate(body, { abortEarly: false });
};

const model=mongoose.model('Share',schema)
module.exports=model