const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    catalog_nbr: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    course_info: [
        {
        class_nbr: {
            type: Number,
            required: true
        },
        start_time: {
            type: String,
            required: true
        },
        descrlong: {
            type: String,
        },
        end_time: {
            type: String,
            required: true
        },
        campus: {
            type: String,
            required: true
        },
        facility_ID: {
            type: String,
            required: true
        },
        days: [
            {
                day: {
                    type: String
                }
            }
        ],
        instructors: [
            {
                instructor: {
                    type: String
                }
            }
        ],
        class_section: {
            type: String
        },
        ssr_component: {
            type: String
        },
        enrl_stat: {
            type: String
        },
        descr: {
            type: String
        }
        }
    ],
    catalog_description: {
        type: String
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);