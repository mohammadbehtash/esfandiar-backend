const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const model=mongoose.model('Hobbies',schema)
module.exports=model