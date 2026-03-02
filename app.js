
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();


//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/myData").then(function(res){
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

app.post("/register/:id",(req,res)=>{
    const userId = req.params.id;
    const {Name,email,password} = req.body;
    if(Name=="" || email =="" || password == ""){
        console.log(`Enter Write Name/email/password`);
    }else{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                try{
                    const newUser = new User({
                        Name:Name,
                        email:email,
                        password:salt
                    })
                
                    await newUser.save();
                }catch(err){
                    console.log(err);
                }
            })
        })

        console.log(userId);
    }


})

app.get("/",async(req,res)=>{
    try{
        const data = await User.find();
        const another = await User.findOne({email:"mansih@dkfj"});
        console.log(another);
        res.json(data);
    }catch(err){
        console.log(err);
    }
})


app.listen(5000);