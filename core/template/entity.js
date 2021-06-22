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
var __SCHEMA_NAME__ = new Schema(__FIELDS_LIST__, { versionKey: false, collation: { locale: 'vi' } });

// Register the schema
exports.__ENTITY_NAME__ = mongoose.model("__ENTITY_NAME__", __SCHEMA_NAME__, "__COLLECTION_NAME__");