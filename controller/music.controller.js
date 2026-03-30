const mongoose = require("mongoose");
const musicModel = require("../models/music-model")
const userModel = require("../models/user-model")
const {uploadFile} = require("../services/storage.service")
require('dotenv').config()
const fs = require('fs')
const albumModel = require("../models/album.model")



async function createMusic(req,res){
  try{      
    
    //Input from body 
     const {title} = req.body;
     const file = req.file;

    //File exists or not  
     if (!req.file) {
       return res.status(400).json({ message: "No file uploaded" })
     }
 
    //Data from cookies by authMiddleware 
     const user = req.user

    //Create link from upload file 
     const result= await uploadFile(file.buffer.toString('base64'))
    
    //Find music from title
     const existingMusic = await musicModel.findOne({title, artist:user._id})

    //Check music already exists or not
     if(existingMusic){
       return res.status(400).json({message:"Music already exists"})
     }

    //Create model 
     const music = await musicModel.create({
         uri: result.url,
         title,
         artist:user._id
     })
    
     res.status(200).json({message:"Music created successfully",
         music:{
             id: music._id,
             title: music.title,
             uri: music.uri,
             artist: music.artist
         }
     })

  }catch(err){
     return res.status(401).json({message:err.message})
}
}

async function getAllSong(req,res){
  try{

    //Data fetched
        const music = await musicModel.find().populate("artist", "username email")
        res.status(200).json({message:"Music fetched successfully.", count:music.length, music})

  }catch(err){
       res.status(500).json({message:"Failed to fetch music."})
  }
}

async function listenSong(req,res){

    //Id from dynamic
    const {_id} = req.params
    
    //Data fetched
 try{
    const music = await musicModel.findById(_id)
    
    
    if(!music){
        return res.status(400).json({message:"Music Not found"})
    }

    if(!music.uri){
        return res.status(400).json({message:"Music URI missing"})
    }
    
    return res.status(200).json({"Link : ":music.uri})
}catch(err){
    return res.status(400).json({message:err.message})
}
}

async function createAlbum(req,res){
    
        const {title, music} = req.body
        const data = req.user
    try{    const album = await albumModel.create({
            title,
            artist:data._id,
            music:music
        })

        res.status(200).json({message:"Album created successfully",
            album:{
                _id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.music
            }
        })
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

async function getAllAlbums(req,res){
    try {
        const {artist} = req.params
        const albums = await albumModel.find({artist:new mongoose.Types.ObjectId(artist)}).populate("music")
        return res.status(200).json({message: "Albums fetched successfully", albums})
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}
module.exports={createMusic, getAllSong, createAlbum,getAllAlbums, listenSong}