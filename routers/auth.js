const express=require('express')
const controle=require('../controls/auth')
const userMiddleware=require('../middlewares/user.middelewares')

const router=express.Router()

router.post('/register',controle.register)

router.post('/login',controle.login)
router.put('/reset-username',controle.reset_Username)


module.exports=router