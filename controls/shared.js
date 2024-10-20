const { default: mongoose } = require('mongoose');
const SharedModel=require('../modelse/shared')

exports.addLink=async(req,res,next)=>{
    try{

        const { error } = SharedModel.SharedValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
  

        const {name,link,icon}=req.body
        await SharedModel.create({name,link,icon})
        return res.json({message:'Shared link is created'})
    }catch(err){
        next(err)
    }
}
exports.getAll=async(req,res,next)=>{
    try{
        const SharedLinks=await SharedModel.find({})
        return res.json(SharedLinks)
    }catch(err){
        next(err)
    }
}
exports.deletLink=async(req,res,next)=>{
    try{
        const {id}=req.params
        const isValidID = mongoose.Types.ObjectId.isValid(id)
        if (!isValidID) {
            return res.status(406).json({ message: "Id is not valid" })
        }

        await SharedModel.findOneAndDelete({ _id: id })
        return res.json({message:'Shared link is deleted'})
    }catch(err){
        next(err)
    }
}