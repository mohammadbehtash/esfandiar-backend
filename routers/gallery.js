const express = require('express');
const upload = require('../utils/uploader');
const galleryController = require('../controls/gallery');
const userMiddleware=require('../middlewares/user.middelewares')

const router = express.Router();

router.post('/', upload.single('image'),userMiddleware, galleryController.createImage)

router.get('/',galleryController.getAll)

router.delete('/:id',userMiddleware, galleryController.deleteImage);



module.exports = router;
