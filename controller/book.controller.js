import Book from "../model/book.model.js";
//get all bookd
export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const recordsPerPage = parseInt(req.query.recordsperpage) || 10;
const category=req.query.category
   
 // Build the query
 const query = {};
 if (category) {
   query.category = category;
 }
    const skip = page * recordsPerPage;

    const books = await Book.find(query).skip(skip).limit(recordsPerPage);

    const totalRecords = await Book.countDocuments();

    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    // Prepare metadata for response
    const meta = {
      total_records: totalRecords,
      total_pages: totalPages - 1,
      current_page: page,
      next_page: page < totalPages - 1 ? page + 1 : null,
      previous_page: page > 0 ? page - 1 : null,
      records_per_page: recordsPerPage,
    };

    // Prepare response data
    const dataToSend = { books, meta };

    // Send response
    res.status(200).json(dataToSend);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
// Create a new book
export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single book by ID
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a book by ID
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
