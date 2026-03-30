require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const connectDB = require("./config/db")
const dns = require("dns")
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const cors = require("cors")

const frontendUrl = process.env.FRONTEND_URL

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      frontendUrl,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:8080',  // 👈 added
    ].filter(Boolean)

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin}`))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

dns.setServers(['8.8.8.8', '8.8.4.4'])
connectDB()

app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: '🎵 Server is awake!' })
})

app.use("/api/auth", authRoutes)
app.use("/api/music", musicRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`)
})