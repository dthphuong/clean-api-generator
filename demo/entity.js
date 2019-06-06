var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var NAMESCHEMA = new Schema(
        {TYPE},
{
        versionKey: false
});

// Register the schema
var ENTITY = mongoose.model("NAMESCHEMA", NAMESCHEMA, "NAMEDB");
exports.ENTITNAME= ENTITY;