import express from 'express'
import { getBooks,createBook,getBook,updateBook,deleteBook } from '../controller/book.controller.js'
import Book from '../model/book.model.js'


const router=express.Router()

// get all books
router.get('/',getBooks)
// Create a new book
router.post('/', createBook);



// Get a single book by ID
router.get('/:id', getBook);

// Update a book by ID
router.put('/:id',updateBook);

// Delete a book by ID
router.delete('/:id', deleteBook);

export default router; 