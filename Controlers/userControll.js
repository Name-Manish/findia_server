const dbconnect = require("../config/dbconnect");
const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookie = require("cookie-parser");


// const authMiddleware = require("../Middlewares/authMiddleware");

dotenv.config();


exports.home = async(req,res) => {
    try{
        const allUserData = await Users.find();
        res.json(allUserData);
    }catch(err){
        return res.status(404).json("database is note connected",err);
    }
}
exports.register = async(req,res) => {
    const {name,email,password} = req.body;
    try{
        const isMatch = await Users.findOne({email});
        if(isMatch){
            return res.status(404).json("User found");  
        }

        const hassedPassword = await bcrypt.hash(password,10);
        const newUser = Users({
            name:name,
            email:email,
            password:hassedPassword
        })

        await newUser.save();
        return res.status(200).json("user registered");
        
    }catch(err){
        return res.status(404).json("Somthing Error",err);
        
    }
}

exports.login = async(req,res) => {
    const {email,password} = req.body;
    try{
        const findUser = await Users.findOne({email});

        if(!findUser){
            return res.status(404).json("user is not register");
        }
        
        const isMatch = await bcrypt.compare(password,findUser.password);
        
        if(!isMatch){
            return res.status(404).json("Your Password is wrong"); 
        }
        //user token with
                const jwtUser = {
                    id:findUser._id,
                    email:findUser.email
                }
        //token generate
            const token = jwt.sign(jwtUser,process.env.secrete_key,{expiresIn:"1h"});
        
            res.cookie("token",token,{
                httpOnly:true
            });

            res.json({
                message:"login successfully yor are authorize",
                token
            })
    }catch(err){
        return res.status(404).json("Login Error Try again",err);

    }
}


exports.profile = async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(404).json("login required");
    }

    res.json({
        success:"login successfull",
        token,
        email:req.user.email,
        logedIn:true

    });
}


exports.logout = async(req,res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: true // production me true
    });

    res.json({ message: "Logged out successfully" });
}