const express=require('express')
const cors=require('cors')
const path=require('path')

// router
const authRouter=require('./routers/auth')
const userRouter=require('./routers/user')
const sharedRouter=require('./routers/shared')
const aboutMeRouter=require('./routers/about-me')
const hobbiesMeRouter=require('./routers/hobbies')
const cvRouter=require('./routers/cv')
const cvimgRouter=require('./routers/cvImg')
const paperRouter=require('./routers/papers')
const videoRouter=require('./routers/video')
const galleryRouter=require('./routers/gallery')

const app=express()
app.use('/img',express.static(path.join(__dirname,'public','img')))

app.use(cors({credentials:true,origin:'http://localhost:4200'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// router
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/share',sharedRouter)
app.use('/about-me',aboutMeRouter)
app.use('/hobbies',hobbiesMeRouter)
app.use('/cv',cvRouter)
app.use('/cvimg',cvimgRouter)
app.use('/paper',paperRouter)
app.use('/video',videoRouter)
app.use('/gallery',galleryRouter)


app.use((req, res, next) => {
    const error = new Error(`This path is not available: ${req.path}`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    return res.json({
        statusCode:err.status || 500,
        msg:err.message || 'server Err'
    })
})

module.exports=app