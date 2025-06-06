const bcrypt = require('bcrypt');
const User = require('../Models/User'); 
const jwt=require('jsonwebtoken');
require('dotenv').config();


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup Successful",
            success: true
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ 
            message: "internal server error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
            return res.status(403).json({
                message: 'Authentication failed. Email or password wrong.',
                success: false
            });
        }

        const isPassEqual=await bcrypt.compare(password,existingUser.password);
        if(!isPassEqual){
            return res.status(403).json({
                message: 'Authentication failed. Email or password wrong.',
                success: false
            });
        }
        const jwtToken=jwt.sign(
            { email: existingUser.email, _id: existingUser.id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            email,
            name: existingUser.name
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ 
            message: "internal server error",
            success: false
        });
    }
};

module.exports = { signup, login };
