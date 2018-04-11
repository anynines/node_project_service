const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes.js');
app.use('/', routes);

app.listen(3000);
console.log('server started on port 3000');
