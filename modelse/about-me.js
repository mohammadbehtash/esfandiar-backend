const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const model=mongoose.model('About-me',schema)
module.exports=model