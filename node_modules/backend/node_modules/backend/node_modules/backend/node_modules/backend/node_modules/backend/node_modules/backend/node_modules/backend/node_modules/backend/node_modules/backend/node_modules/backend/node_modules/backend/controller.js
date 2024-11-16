const User = require( "./model/user" )
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken");


const register=async(req, res)=>{
    const {userName, email, password}=req.body
    try{
        //check if email exists
        if (!userName || userName.trim() === '') {
            return res.status(400).json({ success: false, message: 'Username is required' });
          }
        
          // Check if email or userName already exists
        //   const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        //   if (existingUser) {
        //     return res.status(400).json({ success: false, message: 'Email or Username already exists' });
        //   }
        const checkuser= await User.findOne({email})
        if(checkuser){
            return res.json({success:false, message:'Email already Exists'})
        }
        const hashpassword=await bcrypt.hash(password, 10)

        const newUser= new User({userName, email,  password:hashpassword})

        await newUser.save()
        res.status(200).json({success:true, message:'Successfully registered'})

    }catch(e){
        console.error(e);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    
    }
}


const loginUser= async (req, res)=>{
    const {email, password}= req.body
    try{
        const checkUser = await User.findOne({email})
        if(!checkUser){
           return res.json({success:false,
                      message:"email dont exists"
            })
        }


        const checkPasswordMatch = bcrypt.compare(password, checkUser.password)
        if(!checkPasswordMatch) return res.json({success:false, message:'Wrong password'})
        
        const token=jwt.sign({id:checkUser._id, role:checkUser.role, email:checkUser.email}, 
        'CLIENT_SECRET_KEY', {expiresIn:'60m'})

        res.cookie(
            'token', token, {httpOnly:true, secure:false}
        ).json({
            
        success:true, 
        message:'Login Successfully',
        user:{
            email:checkUser.email,
            role:checkUser.role,
            id:checkUser._id
        }



        })
    }catch(e){
        console.log(e)
        res.json({success:false, message:'error logging in'})
    }
}

const logoutUser = (req, res)=>{
    res.clearCookie('token').json({success:true, message:'logged out successful'})
}

//authMiddleware
const authMiddleware = async(req, res, next)=>{
    if(!req.cookies || !req.cookies.token) {
        return res.status(401).json({ error: 'Token not found' });
      }
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({
            success:false,
            message:'Unauthorized user'
        })

    
    try{
       const decoded = jwt.verify(token,'CLIENT_SECRET_KEY')
       req.user=decoded
       next()
    }catch(error){
        res.status(401).json({success:false, message:'unauthorized user'})
    }
}
module.exports={register, loginUser, logoutUser, authMiddleware}