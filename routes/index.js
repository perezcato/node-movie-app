const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/movies', (req, res, next) => {
  res.status(200);
  res.json({
    message: 'App is working',
  });
});

module.exports = router;
