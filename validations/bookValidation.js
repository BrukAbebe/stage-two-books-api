const Joi = require('joi');

exports.createBook = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required.',
        'any.required': 'Title is required.',
    }),
    author: Joi.string().required().messages({
        'string.empty': 'Author is required.',
        'any.required': 'Author is required.',
    }),
    isbn: Joi.string().required().messages({
        'string.empty': 'ISBN is required.',
        'any.required': 'ISBN is required.',
    }),
    publishedYear: Joi.number().integer().required().messages({
        'number.base': 'Published year must be a number.',
        'any.required': 'Published year is required.',
    }),
    favorite: Joi.boolean().optional(),
});

exports.updateBook = exports.createBook;