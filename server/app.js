import express from 'express'
import dotenv from 'dotenv'
import './config/db.js' // Assuming this is where your Mongoose connection is initialized
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieparser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
      origin: "https://verceltest-navy-xi.vercel.app",
      method: "GET,POST,HEAD,PUT,PATCH,DELETE",
      credentials: true,
      allowedHeader: "Content-Type, Authorization"
}

app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieparser())

// Using MongoStore with your existing Mongoose connection
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: mongoose.connection.getClient(), // Reuse the existing Mongoose connection
    ttl: 24 * 60 * 60 // Session expiry in seconds (1 day)
  }),
  cookie: {
    secure: false, // Set to true in production if you're using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}))

app.use('/', userRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
