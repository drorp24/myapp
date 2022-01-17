const express = require('express');
const router = express.Router();
const callApi = require('../callApi');

router.get('/', async function (req, res) {
  const url = 'https://dog.ceo/api/breeds/image/random';
  const { status, message } = await callApi(url);

  if (status === 200) {
    res.render('dogs', { url: message });
  } else {
    res.status(status).send(message);
  }
});

module.exports = router;
