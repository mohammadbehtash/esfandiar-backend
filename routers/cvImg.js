const express = require('express');
const upload = require('../utils/uploader');
const imageController = require('../controls/cvImg');
const userMiddleware=require('../middlewares/user.middelewares')

const router = express.Router();

// آپلود عکس
router.post('/upload', upload.single('image'),userMiddleware, imageController.uploadImage);

// مشاهده عکس‌ها
router.get('/', imageController.getImages);

// حذف عکس
router.delete('/delete/:id',userMiddleware, imageController.deleteImage); // ID عکس به عنوان پارامتر

module.exports = router;