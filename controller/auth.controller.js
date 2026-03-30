const userModel = require("../models/user-model")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const { sendRegistrationEmail } = require("../services/email-service")
require('dotenv').config()

async function registerUser(req,res){
  try{
      //Input from body
      const {username, email, password,role} = req.body
       
      //Find user
      const isUser = await userModel.findOne({
         $or:[{username},{email}]
      })
      if(isUser){
         return res.status(409).json({message:"User Already Exists."})
      }

      //Bcrypt password
       const hash = await bcrypt.hash(password,10)

       //User add in database
       const user = await userModel.create({
           username,
           email,
           password:hash,
           role
       })

       await sendRegistrationEmail(user.email,user.username)

       //Generate token and set cookie
        const token = jwt.sign({email:user.email, _id:user._id}, process.env.SECRET_KEY)
        
        res.cookie("token", token, { httpOnly: false, secure: false, sameSite: 'lax' })
        return res.json({message:"User Created successfully", user: user, token: token})

        
   
     } catch(err){
        return res.status(500).send("Server Error")
   }
}

async function loginUser(req,res){
    try{
        //input from body
        const {username, email, password} = req.body
        if((!email && !username) || !password){
            return res.status(400).send("Something went wrong")
        }
          
        //Check user
        const query = [];
        if (email) query.push({ email });
        if (username) query.push({ username });

        if (query.length === 0) {
            return res.status(400).send("User not found");
        }

        const user = await userModel.findOne({
            $or: query
        })
        if(!user){
            return res.status(400).send("User not found")
        }

        //Compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
           return res.status(400).json({message:"Invalid Password."})
        }
        
        //Generate token and set cookie
        const token = jwt.sign({email:user.email, _id:user._id}, process.env.SECRET_KEY)
        res.cookie("token", token, { httpOnly: false, secure: false, sameSite: 'lax' })
        res.json({message:"User Successfully Login",user:user, token:token})

       }catch(err){
        res.status(500).json({message:err.message})
       }
}

async function logout(req,res){
    res.clearCookie("token")
    return res.status(200).json({message:"Logout Successfully"})
}


module.exports = {registerUser, loginUser, logout}