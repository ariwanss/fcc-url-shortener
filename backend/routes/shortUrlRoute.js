const express = require('express');
const router = express.Router();
const {createUrl, getUrl} = require('../controllers/shortUrlController');

router.post('/', createUrl);
router.get('/:id', getUrl);

module.exports = router;