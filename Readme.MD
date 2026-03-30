<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png" width="100" alt="Spotify Logo"/>

# 🎵 Spotify Clone — Backend

**A full-featured RESTful backend for a Spotify-like music streaming platform**  
Built with **Node.js**, **Express.js**, **MongoDB**, and **ImageKit**

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![ImageKit](https://img.shields.io/badge/ImageKit-F15A2B?style=for-the-badge&logo=imagekit&logoColor=white)](https://imagekit.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br/>

![GitHub repo size](https://img.shields.io/github/repo-size/MUKULSAINI-76059/Spotify-Clone-Backend?color=1DB954&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/MUKULSAINI-76059/Spotify-Clone-Backend?color=1DB954&style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/MUKULSAINI-76059/Spotify-Clone-Backend?color=1DB954&style=flat-square)
![License](https://img.shields.io/badge/license-ISC-1DB954?style=flat-square)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [🔑 Authentication Flow](#-authentication-flow)
- [📦 Dependencies](#-dependencies)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔐 **JWT Auth** | Secure user authentication with JSON Web Tokens |
| 🍪 **Cookie-based Sessions** | Persistent login sessions using HTTP-only cookies |
| 🔒 **Password Encryption** | Passwords hashed with `bcrypt` |
| 📁 **File Uploads** | Song and image uploads powered by `multer` |
| ☁️ **Cloud Media Storage** | Images & audio hosted on **ImageKit CDN** |
| 📧 **Email Service** | Transactional emails via `nodemailer` |
| 🧩 **Modular Architecture** | Clean MVC structure (routes, controllers, services, models) |
| 🛡️ **Middleware Protection** | Route guarding via custom auth middlewares |
| 🌐 **CORS Enabled** | Cross-origin support for frontend integration |

---

## 🛠️ Tech Stack

```
Runtime       →  Node.js
Framework     →  Express.js v5
Database      →  MongoDB + Mongoose
Auth          →  JWT + bcrypt
File Upload   →  Multer
Cloud Storage →  ImageKit
Email         →  Nodemailer
Config        →  dotenv
```

---

## 📁 Project Structure

```
Spotify-Clone-Backend/
│
├── 📂 config/           # DB connection & third-party config (ImageKit, etc.)
├── 📂 controller/       # Business logic for each resource
├── 📂 middlewares/      # Auth guards and request interceptors
├── 📂 models/           # Mongoose schemas (User, Song, Playlist, etc.)
├── 📂 routes/           # Express route definitions
├── 📂 services/         # Reusable services (email, file upload, etc.)
│
├── 📄 app.js            # App entry point — Express setup & middleware
├── 📄 check_users.js    # Utility script to inspect users in DB
├── 📄 output.json       # Sample/test output data
├── 📄 .gitignore
├── 📄 package.json
└── 📄 README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [MongoDB](https://mongodb.com/) (local or [Atlas](https://cloud.mongodb.com/))
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/MUKULSAINI-76059/Spotify-Clone-Backend.git
cd Spotify-Clone-Backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables)):
```bash
cp .env.example .env
```

**4. Start the development server**
```bash
node app.js
```

The server will start at `http://localhost:5000` *(or your configured port)*.

---

## 🔐 Environment Variables

Create a `.env` file in the root with the following keys:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/spotify-clone

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Nodemailer (Email)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 📡 API Endpoints

### 👤 Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login and receive JWT cookie | ❌ |
| `POST` | `/logout` | Clear session cookie | ✅ |
| `GET` | `/me` | Get current logged-in user | ✅ |

### 🎵 Song Routes — `/api/songs`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `GET` | `/` | Get all songs | ✅ |
| `POST` | `/upload` | Upload a new song (audio + cover) | ✅ |
| `GET` | `/:id` | Get a single song by ID | ✅ |
| `DELETE` | `/:id` | Delete a song | ✅ |

### 📋 Playlist Routes — `/api/playlists`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `GET` | `/` | Get user's playlists | ✅ |
| `POST` | `/` | Create a new playlist | ✅ |
| `PUT` | `/:id/add` | Add a song to playlist | ✅ |
| `DELETE` | `/:id` | Delete a playlist | ✅ |

### 👥 User Routes — `/api/users`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `GET` | `/profile` | Get user profile | ✅ |
| `PUT` | `/profile` | Update user profile | ✅ |

> 📝 Base URL: `http://localhost:5000`

---

## 🔑 Authentication Flow

```
  Client                         Server
    │                               │
    │  POST /api/auth/login         │
    │──────────────────────────────▶│
    │                               │  Validate credentials
    │                               │  Generate JWT
    │  ◀── Set-Cookie: token=...    │
    │                               │
    │  GET /api/songs (with cookie) │
    │──────────────────────────────▶│
    │                               │  Middleware verifies JWT
    │  ◀── 200 OK + song data       │
    │                               │
```

The JWT is stored in an **HTTP-only cookie** to prevent XSS attacks.

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.2.1 | Web framework |
| `mongoose` | ^9.3.1 | MongoDB ODM |
| `bcrypt` | ^6.0.0 | Password hashing |
| `jsonwebtoken` | ^9.0.3 | JWT generation & verification |
| `cookie-parser` | ^1.4.7 | Parse HTTP cookies |
| `cors` | ^2.8.6 | Cross-origin resource sharing |
| `multer` | ^2.1.1 | File upload handling |
| `@imagekit/nodejs` | ^7.3.0 | Cloud media storage |
| `nodemailer` | ^8.0.4 | Email sending |
| `dotenv` | ^17.3.1 | Environment variable management |
| `fs` | ^0.0.1 | File system utilities |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 🎉

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add some amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

<div align="center">

**Mukul Saini**

[![GitHub](https://img.shields.io/badge/GitHub-MUKULSAINI--76059-181717?style=for-the-badge&logo=github)](https://github.com/MUKULSAINI-76059)

*If you found this project helpful, please consider giving it a ⭐ — it means a lot!*

</div>

---

<div align="center">

Made with ❤️ and 🎵 by Mukul Saini

</div>
