const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
        }
    ],
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    },
    modified: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);