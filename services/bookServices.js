const Book = require('../models/Book');

exports.createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};

exports.getAllBooks = async () => {
    return await Book.find();
};

exports.updateBookById = async (id, bookData) => {
    const book = await Book.findByIdAndUpdate(id, bookData, { new: true, runValidators: true });
    if (!book) throw new Error('Book not found');
    return book;
};