
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bookRoute from './route/book.route.js'
import cors from 'cors'
const app = express()
app.use(cors())
dotenv.config()
const port = process.env.PORT || 4000
const mongoDBURI=process.env.mongoDBURI

try{
mongoose.connect(mongoDBURI);
console.log(`connected to mongodb`)
}
catch(error)
{
console.log(error)
}
app.get('/', (req, res) => {
  res.send('Mern stack')
})
app.use('/book',bookRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})