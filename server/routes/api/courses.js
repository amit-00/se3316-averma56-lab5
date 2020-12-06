const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Course = require('../../models/Course');
const User = require('../../models/User');


//@route    GET /api/courses
//@desc     Get all courses in DB
//@access   public
router.get('/', async(req, res) => {
    try{
        const courses = await Course.find()
        res.json(courses);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/courses/:id
//@desc     Get single course
//@access   public
router.get('/:id', auth, async(req, res) => {
    try{
        const course = await Course.findById(req.params.id);
        if(!course) {
            return res.status(404).json({errors: [{ msg: 'course not found' }] });
        }
        res.json(course);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/courses/search?code=&subject=&component=&key=
//@desc     Get all courses with course code in DB
//@access   public
router.get('/search', async(req, res) => {
    try{
        const cata = req.query.code;
        const component = req.query.component;
        const key = req.query.key;
        const sub = req.query.subject;


        if(key){
            const courses = await Course.find({$text : { $search : key }});
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 1' }] });
            }

            return res.json(courses);
        }
        else if(!cata && !component && !sub){
            const courses = await Course.find();
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 2' }] });
            }

            return res.json(courses);
        }
        else if(cata && !component && !sub){
            const courses = await Course.find({ catalog_nbr: { "$regex": cata } });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 3' }] });
            }

            return res.json(courses);
        }
        else if(!cata && component && !sub){
            const courses = await Course.find({ course_info: { "$elemMatch" :{ssr_component: component}} });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 4' }] });
            }

            return res.json(courses);
        }
        else if(!cata && !component && sub){
            const courses = await Course.find({ subject: { "$regex": sub } });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 5' }] });
            }

            return res.json(courses);
        }
        else if(cata && component && !sub){
            const courses = await Course.find({ catalog_nbr: { "$regex": cata }, course_info: { "$elemMatch" :{ssr_component: component}} });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 6' }] });
            }

            return res.json(courses);
        }
        else if(cata && !component && sub){
            const courses = await Course.find({ catalog_nbr: { "$regex": cata }, subject: { "$regex": sub } });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 7' }] });
            }

            return res.json(courses);
        }
        else if(!cata && component && sub){
            const courses = await Course.find({ subject: { "$regex": sub }, course_info: { "$elemMatch" :{ssr_component: component}} });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 8' }] });
            }

            return res.json(courses);
        }
        else{
            const courses = await Course.find({ catalog_nbr: { "$regex": cata }, subject: { "$regex": sub }, course_info: { "$elemMatch" :{ssr_component: component}} });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found 9' }] });
            }

            return res.json(courses);
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    PUT /api/courses/reviews/:id
//@desc     Get all courses in DB
//@access   public
router.put('/reviews/:id', auth,[
    check('comment').trim().escape()
], async(req, res) => {
    const { comment } = req.body;
    try{
        const commenter = await User.findById(req.user.id);

        const review = {
            user: commenter.id,
            name: commenter.name,
            comment,
            hidden: false
        }

        const course = await Course.findById(req.params.id);

        course.reviews.unshift(review);

        course.save();

        res.json(course);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;