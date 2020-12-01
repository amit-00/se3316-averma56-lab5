const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');


//@route    GET /api/courses
//@desc     Get all courses in DB
//@access   public
router.get('/', async(req, res) => {
    try{
        const courses = await Course.find()
        if(!courses){
            return res.status(404).send('subject not found');
        }
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
    try{
        const subject = req.params.code.replace(/[<>?(){}]/g, '');

        const courses = await Course.find({ subject });
        if(!courses){
            return res.status(404).send('subject not found');
        }

        res.json(courses);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/courses/code/:code/:component
//@desc     Get all courses with course code in DB
//@access   public
router.get('/code/:code/:component', async(req, res) => {
    try{
        const cata = req.params.code.replace(/[<>?(){}]/g, '');
        const component = req.params.component.replace(/[<>?(){}]/g, '');

        if(req.params.component === "null"){
            const courses = await Course.find({ catalog_nbr: {"$regex": cata, "$options": "i"} });

            if(!courses){
                return res.status(404).send('course not found');
            }
    
            return res.json(courses);
        }
        else{
            const courses = await Course.find({ catalog_nbr: {"$regex": cata, "$options": "i"}, course_info: { "$elemMatch" :{ssr_component: component}} });

            if(!courses){
                return res.status(404).send('course not found');
            }
    
            return res.json(courses);
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//@route    GET /api/courses/component/:code
//@desc     Get all courses with course code in DB
//@access   public
router.get('/component/:code', async(req, res) => {
    const component = req.params.code.replace(/[<>?(){}]/g, '');
    try{
        const courses = await Course.find({course_info: { "$elemMatch" :{ssr_component: component}}});
        if(!courses){
            return res.status(404).send('subject not found');
        }

        res.json(courses);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;