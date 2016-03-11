
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//mongoose for interaction with mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testing');
require("./PersonSchema.js");
var PersonModel = mongoose.model("Person");
require("./ListSchema.js");
var ListModel = mongoose.model("List");


app.get('/', function(req, res){
       res.send('Welcome to this Cool Shopping List');
   });
   
   
/*
app.get('/register', function(req,res){
      res.send('Welcome to this Cool Shopping List');
   });

app.get('/register/:param1/:param2', function(req,res){
    var newPerson = new PersonModel();
        newPerson.id = req.params.param1;
        newPerson.Password = req.params.param1;
        newPerson.save(function(err){console.log(err);});
});




app.get('/login/:param1/:param2', function(req,res){
   PersonModel.find({"id":req.params.param1}, function(err,output){
       res.send(output);
       });
});
*/

app.get('/list/:param1', function(req,res){
   ListModel.find({"List_id":req.params.param1}, function(err,output){
       res.send(output);
       });
});



app.post('/newlist', function(req, res) {
    var newList = new ListModel();
        console.log(req.body);
        newList.ListId = req.body.ListId;
        newList.save(function(err){console.log(err);});
        res.send('List is ready, you can add items now');
    });


app.post('/additem', function(req, res) {
    var ListId = req.body.ListId;
    console.log(req.body);
    ListModel.update({"name":ListId},{ $push: {Product: req.body.Product, Amount: req.body.Amount, Price: req.body.Price }}, function(err,res){
    res.send('Item is added, you can add another item now');
    });

});




app.listen(3000);
