/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var __SCHEMA_NAME__ = new Schema(__FIELDS_LIST__, { versionKey: false });

// Register the schema
exports.__ENTITY_NAME__ = mongoose.model("__ENTITY_NAME__", __SCHEMA_NAME__, "__COLLECTION_NAME__");