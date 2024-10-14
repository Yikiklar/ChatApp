const express = require('express');
const router = express.Router();
const technologyRoutes = require('./controllers/techonology');

// Technology route'larını yönlendirme
router.use('/technology', technologyRoutes);

module.exports = router;
