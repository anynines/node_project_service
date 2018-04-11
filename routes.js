const express = require('express');
const router = express.Router();
const pg = require('pg');

const PREFIX = "proj_";

const connection = new pg.Client({
  user: 'root',
  database: 'example_app_project_service',
  password: '',
  port: 5432
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting to database: ' + err.stack);
    return;
  }
  console.log('connected to database');
});

router.get('/hello', function(req, res) {
    res.status(200).json({success: true, msg: 'hi !'});
});

router.post('/create_table', function(req, res) {
  connection.query('CREATE TABLE IF NOT EXISTS projects(id INT, name VARCHAR(32), PRIMARY KEY(id));', function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({success: false, msg: 'could not create table'});
    };
    res.status(200).json({success: true, msg: 'created table'});
  });
});

router.post('/project', function(req, res) {
  var complete_projectname = PREFIX + req.body.projectname;
  var sql_query = 'INSERT INTO projects (id, name) VALUES (coalesce((SELECT max(id)+1 FROM projects), 0) ,\'' + complete_projectname + '\');'

  console.log(sql_query);

  connection.query(sql_query, function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({success: false, msg: 'could not add project'});
    } else {
      res.status(200).json({success: true, msg: 'project added. id: ' + rows.insertId + ', name: ' + complete_projectname});
    };
  });
});

router.get('/project', function(req, res){
  connection.query('SELECT * FROM projects', function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).json({success: false, msg: 'could not get projects'});
    } else {
      res.status(200).json(result.rows);
    }
  });
});

module.exports = router;
