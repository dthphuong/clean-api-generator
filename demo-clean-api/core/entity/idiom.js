/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
const Double = require('@mongoosejs/double');

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var IdiomSchema = new Schema({
    "author": String,
    "sentence": String
}, { versionKey: false });

// Register the schema
exports.IdiomEntity = mongoose.model("IdiomEntity", IdiomSchema, "idiom");