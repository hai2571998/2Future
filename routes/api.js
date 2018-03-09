const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const passport = require('passport');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const dbConfig = require('../config/database');
const router = express.Router();


// Config Database Mysql
var connection = mysql.createPool(dbConfig.connection);

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};



// Get users
router.get('/users', (req, res) => {
  connection.getConnection((err, tempCont) => {
    if(err) {
      tempCont.release();
      sendError(err, res);
    } else {
      tempCont.query('SELECT * FROM user_info', (err, results, fields) => {
        tempCont.release();
        if(err) {
          sendError(err, res);
        } else {
          response.data = results;
          res.json(response);
        }
      });
    }
  });
});

module.exports = router;
