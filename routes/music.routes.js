const express = require("express")
const router = express.Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage }) 
const  {authLogin, authArtist}  = require("../middlewares/authMiddleware")
const {createMusic, createAlbum, getAllSong, getAllAlbums, listenSong} = require("../controller/music.controller")

router.post("/upload", authLogin, authArtist, upload.single("music"), createMusic)
router.get("/listen/:_id",  authLogin ,listenSong)
router.get("/", authLogin, getAllSong)
router.get("/de/:artist", authLogin,getAllAlbums)
router.post("/album", authLogin, authArtist, createAlbum)

module.exports = router