var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var router = express.Router(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes.js');
app.use('/', routes);

app.listen(3000);
console.log('server started on port 3000');