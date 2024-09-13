import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    id:Number,
    title:String,
    price:Number,
    category:String,
    image:String,
    description:String,
    author:String,
    quantity:Number,
})
const Book=mongoose.model('Books',bookSchema)

export default Book;