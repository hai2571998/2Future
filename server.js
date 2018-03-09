const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const passport = require('passport');
const mysql = require('mysql');
const cors = require('cors');
// const config = require('./config/database');

const app = express();

// Cors Middleware
app.use(cors());

// API file for interacting with MongoDB
const api = require('./routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Angular PUBLIC output folder
app.use(express.static(path.join(__dirname, 'public')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
