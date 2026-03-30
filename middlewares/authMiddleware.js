const musicModel = require("../models/music-model")
const userModel = require("../models/user-model")
const jwt = require("jsonwebtoken")
require('dotenv').config()

async function authLogin(req,res,next){
    //Find token from cookie or header
     const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

     if(!token){
          console.log("No token provided")
          return res.status(401).json({message:"Unauthorized"})
      }

 try {
    //verify token
     const decoded = jwt.verify(token,process.env.SECRET_KEY)
     req.user = decoded

   next()
 }catch(err){
    console.log("Token verification failed:", err.message)
    return res.status(400).json({message:"Invalid token"})
 }
}

async function authArtist(req,res,next){
   try{ 

     //Data Fetched of id 
        const user = await userModel.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
     //Find artist exists or not
        if (user.role !== "artist") {
            return res.status(403).json({ message: "Access denied" })
        }

        next()
    }catch(err){
       return res.status(400).json({message:err.message})
}
}


module.exports = { authLogin, authArtist}