const Gallery = require('../modelse/gallery');
const path = require('path');
const fs = require('fs');

exports.createImage = async (req, res, next) => {
  try {
    const newImage = await Gallery.create({ img: req.file.filename });
   return res.status(201).json(newImage);
  } catch (err) {
    next(err);
  }
};

exports.getAll=async(req,res,next)=>{
    try{
        const Allimg=await Gallery.find({})
        if(Allimg.length ==0){
            return res.status(404).json({message:'image not found'})
        }
        return res.json(Allimg)
    }catch(err){
        next(err)
    }
}

exports.deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findById(id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    const imagePath = path.join(__dirname, '..', 'public', 'img', image.img);
    fs.unlink(imagePath, (err) => {
      if (err) console.error('Error deleting image:', err);
    });

    await Gallery.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    next(err);
  }
};
