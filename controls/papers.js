const paperModel=require('../modelse/papers')
const fs = require('fs');
const path = require('path');

exports.createpapers=async(req,res,next)=>{
try{
 const{
        title,
        discription,
        link}=req.body

    const newPaper = await paperModel.create({
        img: req.file.filename,
        title,
        discription,
        link,
      });
      if(!newPaper){
        return res.json({message:'not created'})
      }
      return res.json(newPaper)
}catch(err){
    next(err)
}
   
}

exports.getAll=async(req,res,next)=>{
try{
    const Papers=await paperModel.find({})
    if(Papers.length < 0){
        return res.json({message:'not papers'})
    }
    return res.json(Papers)
}catch(err){
    next(err)
}
}


exports.putPaper = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, discription, link } = req.body;
  
      const oldPaper = await paperModel.findById(id);
      if (!oldPaper) {
        return res.status(404).json({ message: 'Paper not found' });
      }
  
      // حذف عکس قبلی از فایل‌ها
      if (oldPaper.img) {
        const oldImagePath = path.join(__dirname, '..', 'public', 'img', oldPaper.img);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
  
      // به‌روزرسانی اطلاعات با عکس جدید
      const updatedPaper = await paperModel.findByIdAndUpdate(
        id,
        {
          img: req.file ? req.file.filename : oldPaper.img,
          title,
          discription,
          link,
        },
        { new: true }
      );
  
      if (!updatedPaper) {
        return res.status(400).json({ message: 'Paper not updated' });
      }
  
      res.json(updatedPaper);
    } catch (err) {
      next(err);
    }
  };

  exports.removePaper = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const paper = await paperModel.findById(id);
      if (!paper) {
        return res.status(404).json({ message: 'Paper not found' });
      }
  
      // حذف عکس از فایل‌ها
      if (paper.img) {
        const imagePath = path.join(__dirname, '..', 'public', 'img', paper.img);
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Error deleting image:', err);
        });
      }
  
      // حذف رکورد از دیتابیس
      await paperModel.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Paper deleted successfully' });
    } catch (err) {
      next(err);
    }
  };
