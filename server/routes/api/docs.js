const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Doc = require('../../models/Doc');
const router = express.Router();

//@route    GET api/docs
//@desc     get docs
//@access   Private
router.get('/', auth, async (req, res) => {
    if(!req.user.isAdmin){
        return res.status(401).json({ errors:[{ msg: 'Not Authorized' }] });
    }
    try{
        const docs = await Doc.find();

        res.json(docs);

    }
    catch(err){
        console.error(err.message);
        res.stats(500).send('Server Error');
    }
});

//@route    GET api/docs/title/:title
//@desc     get single doc
//@access   Private
router.get('/title/:title', async (req, res) => {
    try{
        const doc = await Doc.findOne({ title: req.params.title });
        if(!doc){
            return res.status(404).json({ errors:[{ msg: 'Doc Not Found' }] });
        }

        res.json(doc);

    }
    catch(err){
        console.error(err.message);
        res.stats(500).send('Server Error');
    }
});

//@route    GET api/docs/doc/:id
//@desc     get single doc by id
//@access   Private
router.get('/doc/:id', auth, async (req, res) => {
    if(!req.user.isAdmin){
        return res.status(401).json({ errors:[{ msg: 'Not Authorized' }] });
    }
    try{
        const doc = await Doc.findById(req.params.id);
        if(!doc){
            return res.status(404).json({ errors:[{ msg: 'Doc Not Found' }] });
        }

        res.json(doc);

    }
    catch(err){
        console.error(err.message);
        res.stats(500).send('Server Error');
    }
});

//@route    PUT api/docs/:id
//@desc     update Docs
//@access   Private
router.put('/:id', auth, async (req, res) => {
    if(!req.user.isAdmin){
        return res.status(401).json({ errors:[{ msg: 'Not Authorized' }] });
    }
    const { content } = req.body;
    try{
        const doc = await Doc.findByIdAndUpdate(req.params.id, { content, modified: Date.now() }, {new: true});

        res.json(doc);

    }
    catch(err){
        console.error(err.message);
        res.stats(500).send('Server Error');
    }
});

module.exports = router;
