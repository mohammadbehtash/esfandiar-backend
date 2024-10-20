const express=require('express')
const controle=require('../controls/about-me')
const userMiddleware=require('../middlewares/user.middelewares')

const router=express.Router()

router.route('/').get(controle.GetShow)
.post(userMiddleware,controle.PostAndUpdateAboutMe)

router.route('/delete').delete(userMiddleware,controle.deletAboutMe)

module.exports=router