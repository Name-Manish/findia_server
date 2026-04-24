const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const mongoUrl = process.env.connection_url;

mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log("Database Note connected error occur",err);
})
