const catchAsync = require('../utils/catchAsync');
const bookService = require('../services/bookServices');

exports.createBook = catchAsync(async (req, res) => {
    const book = await bookService.createBook(req.body);
    res.status(201).json({
        success: true,
        message: "Book created successfully.",
        data: {
            book,
        },
    });
});