/* eslint-disable no-unused-vars */
/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId
const SchemaTypes = Schema.Types

// Create a Mongoose Schema
const __SCHEMA_NAME__ = new Schema(__FIELDS_LIST__, { versionKey: false, collation: { locale: 'vi' } })

// Register the schema
exports.__ENTITY_NAME__ = mongoose.model('__ENTITY_NAME__', __SCHEMA_NAME__, '__COLLECTION_NAME__')
