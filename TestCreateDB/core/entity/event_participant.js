var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var Event_participantSchema = new Schema(
        {participantId: ObjectId,eventId: ObjectId},
{
        versionKey: false
});

// Register the schema
var Event_participant = mongoose.model("Event_participantSchema", Event_participantSchema, "event_participant");
exports.Event_participantEntity= Event_participant;