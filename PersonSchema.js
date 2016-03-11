var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Person = new Schema({
    id: {type: String},
    Password: {type: String},
    Accessible: [String]
});


mongoose.model("Person", Person);



