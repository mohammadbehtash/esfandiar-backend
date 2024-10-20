const path=require('path')
const multer=require('multer')
const crypto=require('crypto')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'public', 'img'));
    },
    filename: (req, file, cb) => {
      const hashedFileName = crypto.createHash('SHA256').update(file.originalname).digest('hex');
      const ext = path.extname(file.originalname);
      cb(null, hashedFileName + ext);
    }
  });
  module.exports = multer({ storage: storage });