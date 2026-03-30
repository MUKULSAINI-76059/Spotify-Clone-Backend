const ImageKit = require("@imagekit/nodejs")

const imageKit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT
})

async function uploadFile(file) {
    try{const result = await imageKit.files.upload({
        file: file,
        fileName: "music_" + Date.now() ,
        folder: "/yt-complete-backend/music"
    })
    
    return result
}catch(err){
    console.log("uploadFile Error : ",err)
    throw new Error(err.message)
}
}

module.exports = { uploadFile }