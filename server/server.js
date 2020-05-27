//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

module.exports=app;

var port = 3000;

app.listen(port, function() {
 console.log('running at localhost: ' + port);
});

