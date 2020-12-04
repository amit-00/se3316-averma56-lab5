const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Course = require('../../models/Course');
const Schedule = require('../../models/Schedule');


//@route    GET /api/schedule
//@desc     Get all schedules
//@access   public
router.get('/', async(req, res) => {
    try{
        const schedules = await Schedule.find();

        res.json(schedules);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/schedule/public
//@desc     Get 10 of the latest public schedules
//@access   public
router.get('/public', async (req, res) => {
    try{
        //returns 10 latest public schedules from db
        const schedules = await Schedule.find({ isPublic: true }).sort({ modified: -1 }).limit(10);
        res.json(schedules);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@route    GET /api/schedule/name/:name
//@desc     Get schedule by name
//@access   public
router.get('/name/:name', async(req, res) => {
    let name = req.params.name;
    try{
        const schedule = await Schedule.findOne({ name }).populate('courses');
        if(!schedule){
            return res.status(404).json({ errors: [{ msg: 'Schedule does not exist' }] });
        }

        res.json(schedule);
    }
    catch(err){
        console.error(err.nessage);
        res.status(500).send('Server Error');
    }
});

//@route    POST /api/schedule
//@desc     create new schedule
//@access   public
router.post('/', [
    check('name', 'Please enter a valid name').not().isEmpty().trim().escape(),
    check('desc').trim().escape()
],async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    let { name, desc, isPublic } = req.body
    try{
        // if(name !== undefined){
        //     name = name.replace(/[<>?(){}]/g, '');
        // }

        let schedule = await Schedule.findOne({ name });
        if(schedule){
            return res.status(400).json({ errors: [{ msg: 'Schedule already exists' }] });
        }

        schedule = new Schedule({
            name,
            desc,
            isPublic
        });

        await schedule.save();

        res.json(schedule);
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST /api/schedule/update
//@desc     update existing schedule
//@access   public
router.post('/update', async(req, res) => {
    let { _id, name, desc, isPublic } = req.body
    try{
        // if(name !== undefined){
        //     name = name.replace(/[<>?(){}]/g, '');
        // }

        let schedule = await Schedule.findById(_id);
        if(!schedule){
            return res.status(400).json({ errors: [{ msg: 'Schedule does not exist' }] });
        }

        schedule.name = name;
        schedule.desc = desc;
        schedule.isPublic = isPublic;
        schedule.date = Date.now();

        await schedule.save();

        res.json(schedule);
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    DELETE /api/schedule
//@desc     delete all schedules
//@access   public
router.delete('/', async(req, res) => {
    try{
        await Schedule.deleteMany({});

        res.json('All schedules deleted');
        
    }
    catch(err){
        console.error(err.nessage);
        res.status(500).send('Server Error');
    }
});

//@route    DELETE /api/schedule/delete/:name
//@desc     delete single schedule by name
//@access   public
router.delete('/delete/:name', async(req, res) => {
    try{
        if(req.params.name === undefined){
            return res.status(400).send('invalid name');
        }

        const name = req.params.name.replace(/[<>?(){}]/g, '');

        await Schedule.findOneAndDelete({ name});

        res.json('Schedule Deleted');
        
    }
    catch(err){
        console.error(err.nessage);
        res.status(500).send('Server Error');
    }
});


//@route    PUT /api/schedule/courses/add
//@desc     add/update course in schedule
//@access   public
router.put('/courses/add', async (req, res) => {
    const { _id, name } = req.body
    try{
        let schedule = await Schedule.findOne({ name });
        if(!schedule){
            return res.status(404).send('Schedule not found');
        }
        const newSchedule = schedule.courses.filter(course => { 
            const test = course._id != _id
            return test
        });
        schedule.courses = newSchedule;
        schedule.courses.push({ _id });

        await schedule.save();

        res.json(schedule);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//@route    DELETE /api/schedule/courses/delete/:schedule/:id
//@desc     remove course from schedule by id
//@access   public
router.delete('/courses/delete/:schedule/:id', async (req, res) => {
    const name = req.params.schedule.replace(/[<>?(){}]/g, '');
    const id = req.params.id.replace(/[<>?(){}]/g, '');
    try{
        let schedule = await Schedule.findOne({ name });
        
        if(!schedule){
            return res.status(404).send('Schedule not found');
        }

        const newSchedule = schedule.courses.filter(course => {
            const test = course._id != id
            return test
        });
        schedule.courses = newSchedule;

        await schedule.save();

        res.json(schedule);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;