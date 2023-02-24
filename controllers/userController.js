const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
require("dotenv").config;


exports.register = async (req, res )=> {
    try {
    const {name , email , password } = req.body;

    if(!name.trim()){
        return res.json({error: "Name is Required"})
    }
    if(!email){
        return res.json({error: "Email is Required"})
    }
    if(!password || password.length < 6){
        return res.json({error: "Password must be at least 6 characters"});
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.json({error: "Email already taken"});
    }

    const hashedPassword = await hashPassword(password);
    
    const uName = name.toLowerCase().replaceAll(/\s/g,'') + Math.floor( Math.random() * 999);

    const user = await new User({ name, email, username : uName , password : hashedPassword}).save();

    const token = jwt.sign({ _id: user._id }, "sEcrEtkEy",{ expiresIn: "7d"});
    
    res.json({
        user:{
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role
        }, token
    })
    }catch(error){
        console.log(error);
    }
};

//Login
exports.login = async (req, res ) =>{
    try{
    const { email, password } = req.body;
    if(!email){
        return res.json({ error:"Email is taken"})
    }
    if(!password || password.length <6){
        return res.json({error:"Password must be at least 6 characters "})
    }
    const user = await User.findOne({email});
    if(!user){
        return res.json({error:"User Not Found"})
    }
    const match =await comparePassword(password, user.password);
    if(!match){
        return res.json({error:"Wrong password"})
    }
    const token = jwt.sign({ _id: user._id }, "sEcrEtkEy", { expiresIn: "7d", } );
    
    res.json({
        user: {
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
        },
        token
    });
    }
    catch(error){
        console.log(error);
    }
};