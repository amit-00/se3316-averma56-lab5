const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
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