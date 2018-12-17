/**
 * Created by Phuong Duong on 09/02/2018
 */

var mongoose = require('mongoose')
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Create a Mongoose Schema
var AccountSchema = new Schema({
    uid: ObjectId, 
});

// Register the schema
var Account = mongoose.model('Account', AccountSchema, 'account');

exports.accountEntity = Account;