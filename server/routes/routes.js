var express = require('express');
var router = express.Router();
var Axios = require('axios');
const {google} = require('googleapis');

router.get('/', function(req, res){
  res.render('index')
});

module.exports = router;