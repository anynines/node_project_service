var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var PREFIX = "proj_";

var connection = mysql.createConnection({
  host     : 'dockerhost',
  user     : 'root',
  password : 'root',
  database : 'projects'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting to mysql: ' + err.stack);
    return;
  } 
  console.log('connected to mysql db ');
});

router.get('/hello', function(req, res) {
    res.status(200).json({success: true, msg: 'hi !'});
});

router.post('/create_table', function(req, res) {
  connection.query('CREATE TABLE IF NOT EXISTS projects(id INT(11) AUTO_INCREMENT, name VARCHAR(32), PRIMARY KEY(id));', function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({success: false, msg: 'could not create table'});
    };
    res.status(200).json({success: true, msg: 'created table'});
  });    
});

router.post('/project', function(req, res) {
  var complete_projectname = PREFIX + req.body.projectname;

  connection.query('INSERT INTO projects (name) VALUES (\"' + complete_projectname + '\");', function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({success: false, msg: 'could not add project'});
    } else {
      res.status(200).json({success: true, msg: 'project added. id: ' + rows.insertId + ', name: ' + complete_projectname});
    };
  });    
});

module.exports = router;