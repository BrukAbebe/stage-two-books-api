const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validate = require('../middlewares/validate');
const bookValidation = require('../validations/bookValidation');


router.post('/', validate(bookValidation.createBook), bookController.createBook);
router.get('/', bookController.getAllBooks);

module.exports = router;