const app=require('./app')
const mongoose=require('mongoose')
require('dotenv').config()
const port=process.env.PORT
console.log();
(async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // خروج از برنامه در صورت خطا
    }
    
})()

app.get('/',(req,res)=>{
    console.log('Token=>',req.header('Authorization').split(' ')[1]);
    res.json({message:'OK'})    
})

app.listen(port,()=>{
    console.log('server running'+port);
    
})