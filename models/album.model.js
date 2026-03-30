const mongoose = require("mongoose")

const albumModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    music:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music"
    }],
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

module.exports = mongoose.model("album",albumModel)