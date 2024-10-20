const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})


const model=mongoose.model('Papers',schema)
module.exports=model