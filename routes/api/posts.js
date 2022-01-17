const express = require('express');
const router = express.Router();

const posts = {
  2021: {
    8: ['a', 'b', 'c'],
    9: ['d', 'e', 'f'],
  },
  2020: {
    8: ['g'],
  },
};

router.get('/:year/:month', function (req, res) {
  const { year, month } = req.params;
  const foundPosts =
    (year && month && posts[year] && posts[year][month]) || 'none';
  res.send({ foundPosts });
});

module.exports = router;
