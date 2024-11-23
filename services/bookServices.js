const Book = require('../models/Book');

exports.createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};