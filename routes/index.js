//Require Express
const router = require('express').Router();
//Group All API Routes
const apiRoutes = require('./api');
//Link API Routes To Router
router.use('/api', apiRoutes)
//Export Router
module.exports = router;