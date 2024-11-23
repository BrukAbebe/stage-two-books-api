const catchAsync = require('../utils/catchAsync');
const bookService = require('../services/bookServices');
const { StatusCodes } = require('http-status-codes');

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

exports.getAllBooks = catchAsync(async (req, res) => {
    const books = await bookService.getAllBooks();
    res.status(StatusCodes.OK).json({
        success: true,
        data: books,
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