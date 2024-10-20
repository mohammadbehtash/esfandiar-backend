const express=require('express')
const controle=require('../controls/hobbies')
const userMiddleware=require('../middlewares/user.middelewares')

const router=express.Router()

router.route('/').get(controle.GetShow)
.post(userMiddleware,controle.PostAndUpdateHobbies)

router.route('/delete').delete(userMiddleware,controle.deletHobbise)

module.exports=router