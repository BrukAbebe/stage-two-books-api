const Book = require('../models/Book');
const mongoose = require('mongoose');


const checkIsbnExists = async (isbn, currentId = null) => {
    const query = { isbn };
    if (currentId) {
        query._id = { $ne: currentId }; 
    }
    const existingBook = await Book.findOne(query);
    return existingBook;
};

const findByIdOrIsbn = async (id) => {
    let book;
    if (isValidObjectId(id)) {
        book = await Book.findById(id);
    }
    if (!book) {
        book = await Book.findOne({ isbn: id });
    }
    return book;
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

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

exports.updateBookById = async (id, bookData) => {
    const book = await findByIdOrIsbn(id);
    if (!book) {
        throw new Error('Book not found');
    }

    if (bookData.isbn) {
        const existingBook = await checkIsbnExists(bookData.isbn, book._id);
        if (existingBook) {
            throw new Error(`ISBN already exists: ${bookData.isbn}`);
        }
    }

    Object.assign(book, bookData); 
    await book.save(); 
    return book;
};

exports.deleteBookById = async (id) => {
    const book = await findByIdOrIsbn(id);
    if (!book) {
        throw new Error('Book not found'); 
    }
    await Book.deleteOne({ _id: book._id }); 
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
    const book = await findByIdOrIsbn(id);
    if (!book) {
        throw new Error('Book not found');
    }
    book.favorite = true; 
    await book.save(); 
    return book;
};

exports.getFavoriteBooks = async () => {
    return await Book.find({ favorite: true });
};

exports.searchBooks = async (query) => {
    return await Book.find({
        $or: [
            { title: { $regex: query, $options: 'i' } }, 
            { author: { $regex: query, $options: 'i' } }
        ]
    });
};

exports.getTotalBooksCount = async () => {
    return await Book.countDocuments(); 
};

exports.getBooksWithPagination = async (page, limit) => {
    if (page < 1 || limit < 1) {
        throw new Error("Page and limit must be greater than 0.");
    }

    const skip = (page - 1) * limit;
    const books = await Book.find().skip(skip).limit(limit);
    return books; 
};


