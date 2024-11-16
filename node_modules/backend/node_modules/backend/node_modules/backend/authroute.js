const express=require('express')
const user=require('./model/user')
const router=express.Router()
const {register, loginUser, logoutUser, authMiddleware}= require('./controller')
router.post('/register', register)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/check-auth', authMiddleware, (req, res)=>{
    const user=req.user
    res.status(200).json({
        success:true, 
        message:'Authenticate user', 
        user,
    })
})
// router.get('/register',(req, res)=>{
//     res.send('register working')
// })
    
    // register

// router.get('/', (req, res)=>{
//     res.send('register page')
    
// }
module.exports=router
