/*
Filename: app.js
Student: Zicong Liang
Student#: 301068166
Date: 10/01/2021
*/

const express = require('express');
const ejs = require('ejs');
const app = express();


app.use('/public',express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.use('/',require('./router/index'));

app.listen(8080);
