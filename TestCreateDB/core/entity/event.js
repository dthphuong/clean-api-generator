var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var EventSchema = new Schema(
        {name: String,description: String,startAt: Date,endAt: Date,banner: String,address: String,contactPerson: ObjectId,score: Number},
{
        versionKey: false
});

// Register the schema
var Event = mongoose.model("EventSchema", EventSchema, "event");
exports.EventEntity= Event;