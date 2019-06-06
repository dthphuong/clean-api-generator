var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var Template_hallSchema = new Schema(
        {name: String,json: String},
{
        versionKey: false
});

// Register the schema
var Template_hall = mongoose.model("Template_hallSchema", Template_hallSchema, "template_hall");
exports.Template_hallEntity= Template_hall;