var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var UserSchema = new Schema(
        {username: String,password: String,fullname: String,phone: String,email: String,facebook: String,address: String,work: String,avatar: String},
{
        versionKey: false
});

// Register the schema
var User = mongoose.model("UserSchema", UserSchema, "user");
exports.UserEntity= User;