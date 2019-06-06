var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var User_groupSchema = new Schema(
        {userId: ObjectId,groupId: ObjectId},
{
        versionKey: false
});

// Register the schema
var User_group = mongoose.model("User_groupSchema", User_groupSchema, "user_group");
exports.User_groupEntity= User_group;