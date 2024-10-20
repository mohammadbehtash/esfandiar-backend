const express=require('express')
const controle=require('../controls/user')
const userMiddleware=require('../middlewares/user.middelewares')
const multer = require('../utils/uploader'); 

const router=express.Router()

// POST: ایجاد یا به‌روزرسانی کاربر (محافظت‌شده)
router.post('/', multer.fields([
      { name: 'userImg', maxCount: 1 },
      { name: 'backgroundImg', maxCount: 1 },
    ]),
    userMiddleware,controle.createOrUpdateUser
  );

// DELETE: حذف کاربر (محافظت‌شده)
router.delete('/delete', userMiddleware, controle.deleteUser);

// GET: دریافت اطلاعات کاربر (محافظت‌نشده)
router.get('/', controle.getUser);

module.exports = router;