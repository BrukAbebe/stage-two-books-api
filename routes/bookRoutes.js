const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validate = require('../middlewares/validate');
const bookValidation = require('../validations/bookValidation');


router.post('/', validate(bookValidation.createBook), bookController.createBook);
router.get('/', bookController.getBooks);
router.put('/:id', validate(bookValidation.updateBook), bookController.updateBook)
router.delete('/:id', bookController.deleteBook);
router.get('/recommendations', bookController.getRandomBookRecommendation);
router.put('/favorite/:id', bookController.markBookAsFavorite);
router.get('/favorites', bookController.getFavoriteBooks);
router.get('/search', bookController.searchBooks);

module.exports = router;