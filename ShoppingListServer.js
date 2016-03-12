
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
   
   

app.post('/register', function(req,res){
    console.log(req.body);
    if(PersonModel.count({"id": req.body.Id})>0){ res.send('Username already taken');}
    else{
    var newPerson = new PersonModel();
        newPerson.id = req.body.Id;
        newPerson.Password = req.body.Password;
        newPerson.save(function(err){console.log(err);});
        res.send('Your account is ready');
    }
});


app.get('/account/', function(req,res){
   PersonModel.find({}, function(err,output){
       res.send(output);
       });
});


app.post('/login', function(req,res){
   console.log(req.body);
   if(PersonModel.count({"id": req.body.Id, "Password": req.body.Password})<=0) res.send('Wrong Id or Password');
   else{
       res.send('You are logged in');
   }
});



app.get('/list/:param1', function(req,res){
   ListModel.find({"ListId":req.params.param1}, function(err,output){
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

app.post('/removelist', function(req, res) {
        ListModel.remove({"ListId":req.body.ListId}, function(err,res1){
        res.send('You bought everything, you can go home');
    });
});


app.post('/additem', function(req, res) {
    console.log(req.body);
    var tObj = {Product: req.body.Product, Amount: req.body.Amount, Price: req.body.Price };
    ListModel.update({"ListId":req.body.ListId},{ "$push": {"entry": tObj} }, function(err,res1){
        if(err){console.log(err);}
        res.send('Item is added');
    });
});

app.post('/removeitem', function(req, res) {
    console.log(req.body);
    var tObj = {Product: req.body.Product, Amount: req.body.Amount, Price: req.body.Price };
    ListModel.update({"ListId":req.body.ListId},{ "$pull": {"entry": tObj} }, function(err,res1){
        if(err){console.log(err);}
        res.send('Item is removed');
    });
});



app.listen(3000);
