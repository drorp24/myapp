const express = require('express');
const router = express.Router();
const booksRouter = require('./books');

// could handle a sub-route with its own dedicated books router like this:
router.use('/:userId/books', booksRouter);

// or handle it here like this:
// router.get('/:userId/books/:bookId', function (req, res) {
//   console.log('req.params: ', req.params);
//   res.send(req.params);
// });

/* GET users listing. */
router.get('/:userId', function (req, res, next) {
  res.send(req.params);
});

module.exports = router;
