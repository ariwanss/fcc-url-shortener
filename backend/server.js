const express = require('express');
const dotenv = require('dotenv').config();
const path = require('node:path');
const connectDB = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware');
const {initCounter} = require('./config/counter');
const urlValidator = require('./middleware/urlValidator');
const port = 3000;

const app = express();
connectDB();
initCounter('urlCounter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.use('/api/shorturl', require('./routes/shortUrlRoute'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));