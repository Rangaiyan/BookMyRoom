const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
// const Listing = require('../models/Listing');
// Register route
router.post('/register', async (req, res) => {
    const { name, email, password ,isAdmin} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            isAdmin,
        });

        const user = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const userResponse = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id
        };

        res.status(200).json(userResponse);
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error });
    }
});

router.get("/getallusers",async(req,res)=>{
    try {
        const users=await User.find();
        res.send(users)
    } catch (error) {
        return res.status(404).json({error})
        
    }
});




router.get('/filter', async (req, res) => {
    const { fromDate, toDate, searchKey } = req.query;
    
    try {
      let query = {};
      
      if (searchKey) {
        query.name = { $regex: searchKey, $options: 'i' };
      }
      
      if (fromDate && toDate) {
        query.availability = {
          $elemMatch: {
            from: { $gte: new Date(fromDate) },
            to: { $lte: new Date(toDate) }
          }
        };
      }
      
      const listings = await Listing.find(query).populate('creator');
      res.status(200).json(listings);
    } catch (err) {
      res.status(404).json({ message: "Failed to fetch listings", error: err.message });
      console.log(err);
    }
  });


module.exports = router;