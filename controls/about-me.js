const AboutMeModel=require('../modelse/about-me')

exports.PostAndUpdateAboutMe=async(req,res,next)=>{
    try{
        const {text}=req.body
        const newText=await AboutMeModel.findOne()
        if(newText){
            const updatedText=await AboutMeModel.findByIdAndUpdate(newText._id,{
                text
            },{new:true,runValidators:true})
            return res.status(200).json({message:'text updated',text:updatedText})
        }else{
            const newText=await AboutMeModel.create({text})
            return res.status(201).json({message:'text creared',text:newText})
        }
    }catch(err){
        next(err)
    }
}
exports.GetShow=async(req,res,next)=>{
    try{
        const texts=await AboutMeModel.find({})
        if(!texts)return res.status(404).json({message:'text not found'})
            return res.json(texts)
    }catch(err){
        next(err)
    }
}
exports.deletAboutMe=async(req,res,next)=>{
    try{

        const text = await AboutMeModel.findOne();
    if (!text) {
      return res.status(404).json({ message: 'text not found' });
    }
   await AboutMeModel.findByIdAndDelete(text._id)
   return res.status(200).json({message:'text deleted'})

    }catch(err){
        next(err)
    }
}