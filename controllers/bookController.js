const catchAsync = require('../utils/catchAsync');
const bookService = require('../services/bookServices');
const { StatusCodes } = require('http-status-codes');
const Book = require('../models/Book');

exports.createBook = catchAsync(async (req, res) => {
    const book = await bookService.createBook(req.body);
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Book created successfully.",
        data: {
            book,
        },
    });
});

exports.getBooks = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

   
    if (page < 1 || limit < 1) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Page and limit must be greater than 0.",
        });
    }

 
    if (!req.query.page && !req.query.limit) {
        const books = await bookService.getAllBooks(); 
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "All books retrieved successfully.",
            data: { books },
        });
    }

 
    const books = await bookService.getBooksWithPagination(page, limit);
    const totalBooks = await bookService.getTotalBooksCount(); 
    const totalPages = Math.ceil(totalBooks / limit); 

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Books retrieved successfully with pagination.",
        data: {
            books,
            pagination: {
                currentPage: page,
                totalPages,
                totalBooks,
                limit,
            }
        },
    });
});

exports.updateBook = catchAsync(async (req, res) => {
    const { id } = req.params; 
    const updatedBook = await bookService.updateBookById(id, req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Book updated successfully.",
        data: {
            book: updatedBook,
        },
    });
});

exports.deleteBook = catchAsync(async (req, res) => {
    const { id } = req.params; 
    await bookService.deleteBookById(id);
    res.status(StatusCodes.NO_CONTENT).send(); 
});


exports.getRandomBookRecommendation = catchAsync(async (req, res) => {
    const randomBook = await bookService.getRandomBook();
    if (!randomBook) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "No books available for recommendations.",
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Random book recommendation retrieved successfully.",
        data: { book: randomBook },
    });
});

exports.markBookAsFavorite = catchAsync(async (req, res) => {
    const { id } = req.params; 
    const updatedBook = await bookService.markBookAsFavorite(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Book marked as favorite successfully.",
        data: { book: updatedBook },
    });
});

exports.getFavoriteBooks = catchAsync(async (req, res) => {
    const favoriteBooks = await bookService.getFavoriteBooks();
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Favorite books retrieved successfully.",
        data: { books: favoriteBooks },
    });
});

exports.searchBooks = catchAsync(async (req, res) => {
    const { query } = req.query; 
    if (!query) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Query parameter is required.",
        });
    }

    const books = await bookService.searchBooks(query);
    
    if (books.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: true,
            message: "No books found matching your query.",
            data: { books: [] },
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Books retrieved successfully.",
        data: { books },
    });
});


