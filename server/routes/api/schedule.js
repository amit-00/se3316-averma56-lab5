const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Course = require('../../models/Course');
const Schedule = require('../../models/Schedule');


//@route    GET /api/schedule
//@desc     Get all schedules
//@access   public
router.get('/', auth, async(req, res) => {
    try{
        const schedules = await Schedule.find().populate('course').sort({ modified: -1 });

        res.json(schedules);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/schedule/user
//@desc     Get all user schedules
//@access   public
router.get('/user', auth, async(req, res) => {
    try{
        const schedules = await Schedule.find({ user: req.user.id }).populate('course').sort({ modified: -1 });

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
        const schedules = await Schedule.find({ isPublic: true }).populate('course').sort({ modified: -1 }).limit(10);
        res.json(schedules);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@route    GET /api/schedule/:id
//@desc     Get schedule by id
//@access   public
router.get('/:id', auth, async(req, res) => {
    let id = req.params.id;
    try{
        const schedule = await Schedule.findById(id).populate('course');
        if(!schedule){
            return res.status(404).json({ errors: [{ msg: 'Schedule does not exist' }] });
        }

        res.json(schedule);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST /api/schedule
//@desc     create new schedule
//@access   public
router.post('/', auth,[
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

        let schedule = await Schedule.findOne({ user: req.user.id, name });
        if(schedule){
            return res.status(400).json({ errors: [{ msg: 'Schedule already exists' }] });
        }

        schedule = new Schedule({
            user: req.user.id,
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

//@route    PUT /api/schedule/update/:id
//@desc     update existing schedule
//@access   public
router.put('/update/:id', auth, [
    check('name', 'Please enter a valid name').not().isEmpty().trim().escape(),
    check('desc').trim().escape()
],async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, desc, isPublic } = req.body
    try{
        // if(name !== undefined){
        //     name = name.replace(/[<>?(){}]/g, '');
        // }

        const body = {
            name,
            desc,
            isPublic,
            modified: Date.now()
        }

        let schedule = await Schedule.findOneAndUpdate({ user: req.user.id, _id: req.params.id }, body, {new: true});
        if(!schedule){
            return res.status(400).json({ errors: [{ msg: 'Schedule does not exist' }] });
        }

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
router.delete('/', auth,async(req, res) => {
    try{
        await Schedule.deleteMany({ user: req.user.id });

        res.json('All schedules deleted');
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    DELETE /api/schedule/delete/:id
//@desc     delete single schedule by id
//@access   public
router.delete('/delete/:id', auth,async(req, res) => {
    try{
        const id = req.params.id;

        await Schedule.findOneAndDelete({ user: req.user.id, _id: req.params.id });

        res.json('Schedule Deleted');
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    PUT /api/schedule/courses/add
//@desc     add/update course in schedule
//@access   public
router.put('/courses/add/:id', auth, async (req, res) => {
    const { scheduleId } = req.body
    try{
        let schedule = await Schedule.findOne({ user: req.user.id, _id: scheduleId });
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

        schedule = await Schedule.findOne({ user: req.user.id, _id: scheduleId }).populate('course');
        if(!schedule){
            return res.status(404).send('Schedule not found');
        }
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
router.delete('/courses/delete/:schedule/:id', auth, async (req, res) => {
    try{
        let schedule = await Schedule.findOne({ user: req.user.id, _id: scheduleId });
        
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