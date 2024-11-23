const Book = require('../models/Book');


const checkIsbnExists = async (isbn, currentId = null) => {
    const query = { isbn };
    if (currentId) {
        query._id = { $ne: currentId }; 
    }
    const existingBook = await Book.findOne(query);
    return existingBook;
};

exports.createBook = async (bookData) => {
    const existingBook = await checkIsbnExists(bookData.isbn);
    if (existingBook) {
        throw new Error(`ISBN already exists: ${bookData.isbn}`);
    }

    const book = new Book(bookData);
    return await book.save();
};

exports.getAllBooks = async () => {
    return await Book.find();
};

exports.updateBookById = async (id, bookData) => {
    
    if (bookData.isbn) {
        const existingBook = await checkIsbnExists(bookData.isbn, id);
        if (existingBook) {
            throw new Error(`ISBN already exists: ${bookData.isbn}`);
        }
    }

    const book = await Book.findByIdAndUpdate(id, bookData, { new: true, runValidators: true });
    if (!book) throw new Error('Book not found');
    return book;
};

exports.deleteBookById = async (id) => {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
        throw new Error('Book not found'); 
    }
    return book; 
};

exports.getRandomBook = async () => {
    const count = await Book.countDocuments();
    if (count === 0) return null;

    const randomIndex = Math.floor(Math.random() * count);
    const randomBook = await Book.findOne().skip(randomIndex);
    return randomBook;
};

exports.markBookAsFavorite = async (id) => {
    const book = await Book.findByIdAndUpdate(id, { favorite: true }, { new: true, runValidators: true });
    if (!book) {
        throw new Error('Book not found');
    }
    return book;
};