var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var AttendanceSchema = new Schema(
        {participantId: ObjectId,eventId: ObjectId,timestamp: Date},
{
        versionKey: false
});

// Register the schema
var Attendance = mongoose.model("AttendanceSchema", AttendanceSchema, "attendance");
exports.AttendanceEntity= Attendance;