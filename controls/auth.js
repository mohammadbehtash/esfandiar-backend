const userModel=require('../modelse/auth')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


exports.register=async(req,res,next)=>{
    try{
        const { error } = userModel.loginValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
        
        const {username,password}=req.body

        const hashPassword=await bcrypt.hash(password,12)
        const user=await userModel.create({
            username,
            password:hashPassword
        })
        const accessToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'10 day'
        })
        return res.status(201).json({user:user,accessToken})
    }catch(err){
        next(err)
    }
}
exports.reset_Username = async (req, res, next) => {
    try {
      
      const { error } = userModel.loginValidation(req.body);
      if (error) {
        return res.status(400).json({ error: error.details });
      }
  
      const { username, password } = req.body;
  
      // پیدا کردن کاربر بر اساس نام کاربری فعلی
      const user = await userModel.findOne();
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // هش کردن کلمه عبور جدید
      const hashPassword = await bcrypt.hash(password, 12);
  
      // به‌روزرسانی نام کاربری و رمز عبور
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        { username, password: hashPassword },
        { new: true, runValidators: true }
      );
      return res.status(200).json({ user: updatedUser, accessToken });
    } catch (err) {
      next(err);
    }
  };
  
exports.login=async(req,res,next)=>{
    try{
        const { error } = userModel.loginValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
        const {username,password}=req.body

        const user=await userModel.findOne({username})
        if(!user){
            return res.status(404).json({message:'user not Found'})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({message:'password is not valid'})
        }
        const accessToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'10 day'
        })
        return res.json(accessToken)
    }catch(err){    
        next(err)
    }
}

