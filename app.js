const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const { verifyToken } = require('./middlewares/user.middleware');
const path = require("path")
require('dotenv').config();

const app = express();
app.use(require("cors")())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/user', require('./routes/user.route'));
app.use('/blog', verifyToken, require('./routes/blog.route'));
app.use('/reaction',verifyToken, require('./routes/reaction.route'));
app.use('/comment', verifyToken, require('./routes/comment.route'))

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
