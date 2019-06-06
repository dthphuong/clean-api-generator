var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var ParticipantSchema = new Schema(
        {code: String,managerId: ObjectId,personalInfo: JSON,avatar: String,qrCode: String,score: Number},
{
        versionKey: false
});

// Register the schema
var Participant = mongoose.model("ParticipantSchema", ParticipantSchema, "participant");
exports.ParticipantEntity= Participant;