const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');


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

//@route    GET /api/courses/subject/:code
//@desc     Get all courses with subject code in DB
//@access   public
router.get('/subject/:code', async(req, res) => {
    const code = req.params.code;
    try{
        const courses = await Course.find({ subject: { "$regex": code } });
        if(!courses || courses.length === 0){
            return res.status(404).json({ errors: [{ msg: 'Course not found' }] });
        }

        res.json(courses);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET 
//@desc     Get all courses with course code in DB
//@access   public
router.get('/search', async(req, res) => {
    try{
        const cata = req.query.code;
        const component = req.query.component;
        const key = req.query.key;

        console.log(cata)
        console.log(component)
        console.log(key)


        if(key !== ""){
            const courses = await Course.find({$text : { $search : key }});
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found' }] });
            }

            return res.json(courses);
        }
        else if(cata === "" && component === ""){
            const courses = await Course.find({});
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found' }] });
            }

            return res.json(courses);
        }
        else if(cata !== "" && component === ""){
            const courses = await Course.find({ catalog_nbr: { "$regex": cata } });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found' }] });
            }

            return res.json(courses);
        }
        else if(cata === "" && component !== ""){
            const courses = await Course.find({ course_info: { "$elemMatch" :{ssr_component: component}} });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found' }] });
            }

            return res.json(courses);
        }
        else{
            const courses = await Course.find({ catalog_nbr: { "$regex": cata } , course_info: { "$elemMatch" :{ssr_component: component}} });
            if(!courses || courses.length === 0){
                return res.status(404).json({errors: [{ msg: 'course not found' }] });
            }

            return res.json(courses);
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;