const HobbiesModel=require('../modelse/hobbies')

exports.PostAndUpdateHobbies=async(req,res,next)=>{
    try{
        const {text}=req.body
        const newText=await HobbiesModel.findOne()
        if(newText){
            const updatedText=await HobbiesModel.findByIdAndUpdate(newText._id,{
                text
            },{new:true,runValidators:true})
            return res.status(200).json({message:'text updated',text:updatedText})
        }else{
            const newText=await HobbiesModel.create({text})
            return res.status(201).json({message:'text creared',text:newText})
        }
    }catch(err){
        next(err)
    }
}
exports.GetShow=async(req,res,next)=>{
    try{
        const texts=await HobbiesModel.find({})
        if(!texts)return res.status(404).json({message:'text not found'})
            return res.json(texts)
    }catch(err){
        next(err)
    }
}
exports.deletHobbise=async(req,res,next)=>{
    try{

        const text = await HobbiesModel.findOne();
    if (!text) {
      return res.status(404).json({ message: 'text not found' });
    }
   await HobbiesModel.findByIdAndDelete(text._id)
   return res.status(200).json({message:'text deleted'})

    }catch(err){
        next(err)
    }
}