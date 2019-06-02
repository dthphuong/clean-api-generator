/**
 * Created by Phuong Duong on 07/02/2018
 */

var mongoose = require('mongoose')
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Create a Mongoose Schema
var IdiomSchema = new Schema({
    author: String, 
    sentence: String
});

// Register the schema
var Idiom = mongoose.model('Idiom', IdiomSchema, 'idiom');

exports.idiomEntity = Idiom;