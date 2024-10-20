const express = require('express');
const upload = require('../utils/uploader');
const Controller = require('../controls/papers');
const userMiddleware=require('../middlewares/user.middelewares')
const router = express.Router();

router.route('/').post(upload.single('image'),userMiddleware,Controller.createpapers)

router.get('/',Controller.getAll)

router.route('/update/:id').put(upload.single('image'),userMiddleware,Controller.putPaper)

router.route('/delete/:id').delete(userMiddleware,Controller.removePaper)

module.exports=router