var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var HallSchema = new Schema(
        {name: String,json: String},
{
        versionKey: false
});

// Register the schema
var Hall = mongoose.model("HallSchema", HallSchema, "hall");
exports.HallEntity= Hall;