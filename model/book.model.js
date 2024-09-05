import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    title:String,
    price:Number,
    category:String,
    image:String,
    description:String,
    author:String
})
const Book=mongoose.model('Books',bookSchema)

export default Book;