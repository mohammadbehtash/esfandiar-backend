const Video = require('../modelse/video');
const path = require('path');
const fs = require('fs');

exports.createVideo = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newVideo = await Video.create({
      title,
      video: req.file.filename,
    });
    res.status(201).json(newVideo);
  } catch (err) {
    next(err);
  }
};

exports.getAll=async(req,res,next)=>{
    try{
        const Allvideo=await Video.find({})
        if(Allvideo.length ==0){
            return res.status(404).json({message:'videos not found'})
        }
        return res.json(Allvideo)
    }catch(err){

    }
}

exports.deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const videoPath = path.join(__dirname, '..', 'public', 'img', video.video);
    fs.unlink(videoPath, (err) => {
      if (err) console.error('Error deleting video:', err);
    });

    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    next(err);
  }
};
