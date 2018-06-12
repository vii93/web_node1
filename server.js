// var http = require('http');
// var dt = require("./my_modules");
// var fs = require("fs");
// http.createServer(function (req, res) {    
//     fs.readFile('demo.html',function(err,data){
//         res.write(data);
//         res.end();
//     });
    
// }).listen(8124);
// console.log('Server running at ');

var express = require('express');
var app = express();
var path = require('path');
var con = require("./router/connect_data");
var router = require("./router/router");
var react = require("react")
var react_dom = require("react-dom")

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, "router")));
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('style'));
app.use(express.static('angular'));
app.engine("html",require("ejs").renderFile)
app.get("",function(req,res) {
    res.render('home');
});

app.get("/admin",function(req,res) {
    res.render('admin_page');
});

router(app);
var con = require("./router/connect_data");

app.listen(80,function(req,res) {
    console.log("connect");
});


