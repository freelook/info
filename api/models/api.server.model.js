'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var APISchema = new Schema({
    name: String,
    facebook: Object,
    vk: Object,
    instagram: Object
});

mongoose.model('API', APISchema);