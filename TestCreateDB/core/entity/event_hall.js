var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var Event_hallSchema = new Schema(
        {hallId: ObjectId,eventId: ObjectId},
{
        versionKey: false
});

// Register the schema
var Event_hall = mongoose.model("Event_hallSchema", Event_hallSchema, "event_hall");
exports.Event_hallEntity= Event_hall;