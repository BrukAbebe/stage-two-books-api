const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorConverter = require('./middlewares/errorConverter');
const errorHandler = require('./middlewares/errorHandler');

const bookRoutes = require('./routes/bookRoutes');


dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/books', bookRoutes);

app.use(errorConverter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});