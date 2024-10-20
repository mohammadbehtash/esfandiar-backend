const jwt=require('jsonwebtoken')
const userModel=require('../modelse/auth')


module.exports=async(req,res,next)=>{
    const authHeader=req.header('Authorization')?.split(' ')
    if(authHeader?.length !==2){
        return res.status(403).json({
            message:"This route is protected and you can't have access to it !!"
        })
    }
    const token=authHeader[1]
    try{

        const jwtPayload=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(jwtPayload.id).lean();
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        req.user=user
        next()
    }catch(err){
        console.log(err);
        
        next(err)
    }
}
// module.exports = async (req, res, next) => {
//     const authHeader = req.header('Authorization')?.split(' ');
//     if (authHeader?.length !== 2) {
//         return res.status(403).json({
//             message: "This route is protected and you can't have access to it !!"
//         });
//     }
    
//     const token = authHeader[1];
    
//     try {
//         const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
//         console.log('JWT Payload:', jwtPayload); // چاپ payload توکن
        
//         const user = await userModel.findById(jwtPayload.id).lean();
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
        
//         req.user = user;
//         next();
//     } catch (err) {
//         console.log('Error verifying token:', err); // چاپ خطا
//         next(err);
//     }
// }