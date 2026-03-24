const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();



// all ports nad url
dotenv.config();
const port = process.env.port;
const connection_url = process.env.connection_url;

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

mongoose.connect(connection_url).then(function(res){
    console.log("mongoDb connected");
}).catch(function(err){
    console.log(err);
})
const newSchema = new mongoose.Schema({
    Name:String,
    email:String,
    password:String
})
const User = mongoose.model("Users",newSchema);

app.post("/register",async(req,res)=>{
    const userId = req.params.id;
    const {Name,email,password} = req.body;
    if(Name=="" || email =="" || password == ""){
        console.log(`Enter Write Name/email/password`);
    }else{
        
        try{
            const hash = await bcrypt.hash(password,10);
            const newUser = new User({
                Name:Name,
                email:email,
                password:hash
            })
        
            await newUser.save();
        }catch(err){
            console.log(err);
        }
        console.log(userId);
    }


})


app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;

        const loginUser = {
            email:email,
            password,password
        }

        const userFind = await User.findOne({email:email});
        if((email===userFind.email)){
            console.log("email authorized hai");
            const passwordCompare = await bcrypt.compare(password,userFind.password);
            if(passwordCompare){
                console.log("successfully login")
                const token = await jwt.sign(loginUser,"secretkey",{expiresIn:"1h"});
                res.json(token);
            }else{
                console.log("your password is wrong")
            }
        }else{
            console.log("user authorize nahi hai");
        }
        
        
    }catch(err){
        console.log(err)
    }
})

app.get("/",async(req,res)=>{
    try{
        const data = await User.find();
        // const another = await User.findOne({email:"mansih@dkfj"});
        // console.log(another);
        res.json(data);
    }catch(err){
        console.log(err);
    }
})


app.listen(port,(err)=>{
    if(!err){
        console.log(`the server is running in this port ${port}`);
    }
    else{
        console.log(`error aa raha hai ${err}`);
    }
});