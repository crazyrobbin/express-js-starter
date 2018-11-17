var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
        res.json(Response.parse(false, "Working"));
});

module.exports = router;