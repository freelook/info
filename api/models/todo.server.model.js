'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TodoSchema = new Schema({
    text: String
});

mongoose.model('Todo', TodoSchema);