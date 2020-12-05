const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

//@route    GET api/auth
//@desc     get user
//@access   Private
router.get('/', auth, async (req, res) => {
    try{
       const user = await User.findById(req.user.id).select('-password');
        if(user.deactivated){
            return res.json(400).json({ errors: [{ msg: 'Account is deactivated' }] })
        }

       res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    POST api/auth
//@desc     authenticate user and get token
//@access   Public
router.post('/', [
    check('email', 'Please include valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists().trim().escape()
] , async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;
    try{
        //Check to see if user exists
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        //return jwt for authentication
        const payload = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;