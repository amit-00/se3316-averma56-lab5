const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');
const Schedule = require('../../models/Schedule');


//@route    GET /api/schedule
//@desc     Get all schedules
//@access   public
router.get('/', async(req, res) => {
    try{
        const schedule = await Schedule.find();

        res.json(schedule);
    }
    catch(err){
        console.error(err.nessage);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/schedule/name/:name
//@desc     Get schedule by name
//@access   public
router.get('/name/:name', async(req, res) => {
    const name = req.params.name.replace(/[<>?(){}]/g, '');
    try{
        const schedule = await Schedule.findOne({ name }).populate('courses');
        if(!schedule){
            return res.status(404).send('no schedule')
        }

        res.json(schedule);
    }
    catch(err){
        console.error(err.nessage);
        res.status(500).send('Server Error');
    }
});

//@route    POST /api/schedule/create
//@desc     create new schedule
//@access   public
router.post('/create', async(req, res) => {
    try{
        const { name } = req.body

        if(name === undefined){
            return res.status(400).send('invalid name');
        }

        const scheduleName = name.replace(/[<>?(){}]/g, '');
        let schedule = await Schedule.findOne({ scheduleName });

        if(schedule){
            return res.status(403).send('schedule already exists');
        }

        schedule = new Schedule({
            name: scheduleName
        });

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
    const courseId = _id.replace(/[<>?(){}]/g, '');
    const scheduleName = name.replace(/[<>?(){}]/g, '');
    try{
        let schedule = await Schedule.findOne({ name: scheduleName });
        if(!schedule){
            return res.status(404).send('Schedule not found');
        }
        const newSchedule = schedule.courses.filter(course => { 
            const test = course._id != courseId
            return test
        });
        schedule.courses = newSchedule;
        schedule.courses.push({ _id: courseId });

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