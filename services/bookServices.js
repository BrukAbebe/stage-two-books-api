const Book = require('../models/Book');

exports.createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};

exports.getAllBooks = async () => {
    return await Book.find(); // Fetch all books from the database
};