const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

//@route    POST api/users
//@desc     create user
//@access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter valid password').isLength({ min:6 })
] , async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;
    try{
        //Check to see if user exists
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        //create new user
        user = new User({
            name,
            email,
            password
        });
        //Create encryption salt
        const salt = await bcrypt.genSalt(10);
        //encrypt user password
        user.password = await bcrypt.hash(password, salt);
        //save user to database
        await user.save();
        //return jwt for authentication
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
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