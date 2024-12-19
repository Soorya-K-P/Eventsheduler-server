const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Event model
        ref: 'Event', // Name of the Event model
        required: true, // Ensure the field is required
      },
    title: {type:String, required: true},
    start_time: {type:Date, required: true},
    end_time: {type:Date, required: true},
    speaker: {type:String, required:true},
    created_at: {type:Date,default:Date.now(),required:true},
    updated_at: {type:Date,default:Date.now(),required:true},
});

    const Session = mongoose.model('session',sessionSchema)

    module.exports = Session;