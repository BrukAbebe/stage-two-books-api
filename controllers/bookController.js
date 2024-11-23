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