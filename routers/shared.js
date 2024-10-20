const express=require('express')
const controle=require('../controls/shared')
const userMiddleware=require('../middlewares/user.middelewares')


const router=express.Router()

router.route('/').post(userMiddleware,controle.addLink)
.get(controle.getAll)

router.route('/delete/:id').delete(userMiddleware,controle.deletLink)

module.exports = router;