const express = require('express');
const router = express.Router();
const {createUrl, getUrl, getUrls, deleteAll} = require('../controllers/shortUrlController');

router.post('/', createUrl);
router.get('/:id', getUrl);
router.get('/', getUrls);
router.delete('/purge', deleteAll);

module.exports = router;