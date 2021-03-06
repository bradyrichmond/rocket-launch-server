//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

module.exports=app;

var port = process.env.PORT || 5000;

app.listen(port, function() {
 console.log('running at localhost: ' + port);
});

