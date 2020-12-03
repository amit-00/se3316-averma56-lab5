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
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
        }
    ]
    
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);