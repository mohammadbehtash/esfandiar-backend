// middleware/multer.js
const multer = require('multer');
const path = require('path');

// دایرکتوری ذخیره‌سازی فایل‌ها
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'pdf'));
    },
    filename: (req, file, cb) => {
        // نام ثابت برای فایل PDF
        cb(null, 'uploaded.pdf'); // نام ثابت برای فایل
    }
});

const upload = multer({ storage: storage });

module.exports = upload;