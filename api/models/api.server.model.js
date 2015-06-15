'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var APISchema = new Schema({
    name: String,
    facebook: {
        token: String,
        expire: Date
    },
    vk: {
        token: String,
        expire: Date
    }
});

mongoose.model('API', APISchema);