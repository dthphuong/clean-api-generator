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
var UserSchema = new Schema({
    "name": String,
    "age": Number,
    "birthday": Date,
    "gender": Boolean,
    "json": JSON
}, { versionKey: false });

// Register the schema
exports.UserEntity = mongoose.model("UserEntity", UserSchema, "user");