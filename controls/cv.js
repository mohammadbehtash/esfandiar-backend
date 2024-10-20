// controllers/pdfController.js
const Pdf = require('../modelse/cv');
const fs = require('fs');
const path = require('path');
// بارگذاری PDF

exports.uploadPdf = async (req, res) => {
    try {
        // پیدا کردن PDF قبلی
        const previousPdf = await Pdf.findOne({});

        // اگر PDF قبلی وجود داشت، آن را حذف کنید
        if (previousPdf) {
            // حذف فایل از دایرکتوری uploads
            fs.unlink(previousPdf.path, (err) => {
                if (err) {
                    console.error('Error deleting previous PDF:', err);
                }
            });

            // حذف ورودی از دیتابیس
            await Pdf.deleteMany({});
        }
        
        // ایجاد PDF جدید
        const newPdf = new Pdf({
            filename: req.file.originalname,
            path: req.file.path
        });
        
        await newPdf.save();
        res.status(201).json({ message: 'PDF uploaded successfully!', pdf: newPdf });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading PDF', error: err });
    }
};

// حذف PDF
exports.deletePdf = async (req, res) => {
    try {
        // پیدا کردن PDF فعلی
        const pdf = await Pdf.findOne({});
        if (pdf) {
            // حذف فایل از دایرکتوری public/pdf
            fs.unlink(pdf.path, (err) => {
                if (err) {
                    console.error('Error deleting PDF file:', err);
                    return res.status(500).json({ message: 'Error deleting PDF file', error: err });
                }
            });
        }

        // حذف ورودی از دیتابیس
        await Pdf.deleteMany({});
       return res.status(200).json({ message: 'PDF deleted successfully!' });
    } catch (err) {
       return res.status(500).json({ message: 'Error deleting PDF', error: err });
    }
};

// دانلود PDF
// exports.downloadPdf = async (req, res) => {
//     try {
//         const pdf = await Pdf.findOne({});
//         if (!pdf) return res.status(404).json({ message: 'PDF not found' });
        
//         res.download(pdf.path, pdf.filename);
//     } catch (err) {
//         res.status(500).json({ message: 'Error downloading PDF', error: err });
//     }
// };
// دانلود PDF
exports.downloadPdf = async (req, res, next) => {
    try {
      const pdf = await Pdf.findOne({});
      if (!pdf) {
        return res.status(404).json({ message: 'PDF not found' });
      }
  
      // مسیر فایل PDF
      const pdfPath = path.resolve(pdf.path);
  
      // ارسال فایل به کلاینت
      res.download(pdfPath, pdf.filename, (err) => {
        if (err) {
          console.error('Error downloading PDF:', err);
          return next(err); // در صورت بروز خطا، هندل کردن آن
        }
      });
    } catch (err) {
      next(err); // هندل کردن خطاهای کلی
    }
  };
exports.showpdf=async(req,res,next)=>{
    try{
        const showPDF=await Pdf.find({})
        if(!showPDF){
            return res.status(404).json({message:'pdf not found'})
        }
        return res.json(showPDF)
    }catch(err){
        next(err)
    }
}
