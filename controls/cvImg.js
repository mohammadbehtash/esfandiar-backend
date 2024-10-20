// controllers/imageController.js
const fs = require('fs');
const path = require('path');
const Image = require('../modelse/cvImg');

// آپلود عکس
exports.uploadImage = async (req, res, next) => {
    try {
    const uploadImge=await Image.create({ image:req.file.filename,})

      
     return res.status(201).json(uploadImge);
    } catch (err) {
      next(err)
    }
  };
  // مشاهده عکس‌ها
  exports.getImages = async (req, res) => {
    try {
      const images = await Image.find({});
      if (!images.length) {
        return res.status(404).json({ message: 'No images found' });
      }
      return res.json(images);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching images', error: err });
    }
  };
  

// حذف عکس
exports.deleteImage = async (req, res,next) => {
    // const { id } = req.params; // دریافت ID از پارامترها
    // try {
    //     const image = await Image.findById(id);
    //     if (image) {
    //         fs.unlink(image.path, (err) => {
    //             if (err) {
    //                 console.error('Error deleting image file:', err);
    //                 return res.status(500).json({ message: 'Error deleting image file', error: err });
    //             }
    //         });
    //         await Image.findByIdAndDelete(id); // حذف از دیتابیس
    //         return res.status(200).json({ message: 'Image deleted successfully!' });
    //     } else {
    //         return res.status(404).json({ message: 'Image not found' });
    //     }
    // } catch (err) {
    //     return res.status(500).json({ message: 'Error deleting image', error: err });
    // }
    // try {
    //   const { id } = req.params;
    //   const image = await Image.findById(id);
    //   if (!image) return res.status(404).json({ message: 'Image not found' });
  
    //   const imagePath = path.join(__dirname, '..', 'public', 'img', image.img);
    //   fs.unlink(imagePath, (err) => {
    //     if (err) console.error('Error deleting image:', err);
    //   });
  
    //   await Image.findByIdAndDelete(id);
    //   return res.status(200).json({ message: 'Image deleted successfully' });
    // } catch (err) {
    //   next(err);
    // }
    try {
      const { id } = req.params;
      const image = await Image.findById(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      // console.log('Image Object:', image); // برای اطمینان از دریافت درست داده‌ها
  
      const imagePath = path.join(__dirname, '..', 'public', 'img', image.image); // اطمینان از درست بودن نام فیلد
  
      // بررسی اینکه آیا imagePath تعریف شده است یا خیر
      if (!imagePath) {
        return res.status(400).json({ message: 'Image path is missing or invalid' });
      }
  
      // حذف فایل از سیستم
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
          return next(err);
        }
        // console.log('Image deleted from filesystem:', imagePath);
      });
  
      // حذف رکورد از دیتابیس
      await Image.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
      console.error('Error:', err);
      next(err); // مدیریت خطاها
    }
};
