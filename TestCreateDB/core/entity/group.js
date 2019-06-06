var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var GroupSchema = new Schema(
        {name: String,description: String,level: Number,permissionList: JSON},
{
        versionKey: false
});

// Register the schema
var Group = mongoose.model("GroupSchema", GroupSchema, "group");
exports.GroupEntity= Group;