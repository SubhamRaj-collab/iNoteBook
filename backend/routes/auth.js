const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'helenisagoodg$irl';
const fetchUser = require('../middleware/fetchUser');

//Route1: Create a User using: POST "/api/auth/createUser". Doesn't require auth. No Login Required
router.post('/createUser', [
    body('name', 'Enter a valid name: ').isLength({ min: 3 }),
    body('email',  'Enter a valid email: ').isEmail(),
    body('password', 'Password must be atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {

    //If there are errors, return bad request and the errors.
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try
    {
        //Check whether a user with this email exists already
        let user = await User.findOne({email: req.body.email})
        console.log(user)

        if(user)
        {
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt); 
        //Creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken});
        // res.json(user)
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    

})

//Route2: Authenticate a User using: POST "/api/auth/login". No Login Required
router.post('/login', [

    body('email',  'Enter a valid email: ').isEmail(),
    body('password',  'Password cannot be blank').exists()

], async (req, res) => {

    //If there are errors, return bad request and the errors.
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({error: "Please try to login with correct Credentials."});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);    //input is password and hash of password.
        if(!passwordCompare)
        {
            return res.status(400).json({error: "Please try to login with correct Credentials."});
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


//Route3: Get LoggedIn User Details using: POST "/api/auth/getUser". Login Required.

router.post('/getUser', fetchUser, async (req, res) => {

    try {
        
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router