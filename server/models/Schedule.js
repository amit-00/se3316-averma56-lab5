const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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