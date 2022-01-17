const express = require('express');
const router = express.Router();

router.get('/:bookId', function (req, res) {
  res.send(/* req.params */ 'name: dror4');
});

module.exports = router;
