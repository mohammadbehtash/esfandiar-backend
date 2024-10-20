const UserModel = require('../modelse/user');
const path=require('path')
const fs = require('fs').promises;

// ایجاد یا به‌روزرسانی کاربر (POST / PUT)
exports.createOrUpdateUser = async (req, res, next) => {
    try {
      const imgUser = req.files['userImg']?.[0];  // دسترسی به فایل userImg
      const imgBg = req.files['backgroundImg']?.[0];  // دسترسی به فایل backgroundImg
  
      const { firsname, description, tell, email } = req.body;  // دریافت مقادیر ورودی
  
      // اعتبارسنجی داده‌ها (فایل‌ها اعتبارسنجی نمی‌شوند)
      const { error } = UserModel.userValidation({ firsname, description, tell, email });
      if (error) {
        return res.status(400).json({ error: error.details });
      }
  
      const existingUser = await UserModel.findOne();
      if (existingUser) {
        // به‌روزرسانی کاربر
        const updatedUser = await UserModel.findByIdAndUpdate(
          existingUser._id,
          {
            userImg: imgUser?.filename,  // استفاده از filename برای ذخیره نام فایل
            backgroundImg: imgBg?.filename,
            firsname,
            description,
            tell,
            email,
          },
          { new: true, runValidators: true }
        );
        return res.status(200).json( updatedUser );
      } else {
        // ایجاد کاربر جدید
        const newUser = await UserModel.create({
          userImg: imgUser?.filename,
          backgroundImg: imgBg?.filename,
          firsname,
          description,
          tell,
          email,
        });
        return res.status(201).json( newUser );
      }
    } catch (err) {
      next(err);
    }
  };
  

// حذف کاربر (DELETE)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
   const userImgPath=path.join(__dirname,'..','public','img',user.userImg)
   const bgImgPath=path.join(__dirname,'..','public','img',user.backgroundImg)

   await fs.unlink(userImgPath)
   await fs.unlink(bgImgPath)


   await UserModel.findByIdAndDelete(user._id)
   return res.status(200).json({message:'user and img deleted'})
   
  } catch (err) {
    next(err);
  }
};

// دریافت کاربر (GET)
exports.getUser = async (req, res, next) => {
    try {
      const user = await UserModel.findOne(); // دریافت کاربر
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };