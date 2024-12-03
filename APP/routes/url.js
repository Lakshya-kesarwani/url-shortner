const express = require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require('../controllers/url')
const router = express.Router();


router.post('/',handleGenerateNewShortUrl);

router.get('/url/analytics/:shortID',handleGetAnalytics)

module.exports = router;