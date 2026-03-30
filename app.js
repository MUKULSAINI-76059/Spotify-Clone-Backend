const express = require("express")
const app = express()
const mongoose = require("mongoose")
const connectDB = require("./config/db")
const dns = require("dns")
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const cors = require("cors");
const port1 = process.env.PORT1
const port2 = process.env.PORT2
app.use(cors({
    origin: [`http://localhost:${port1}`, `http://localhost:${port2}`],
    credentials: true
}));


require('dotenv').config()
dns.setServers(['8.8.8.8', '8.8.4.4'])
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/music", musicRoutes)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
