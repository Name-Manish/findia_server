const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const flashCardRoutes = require("./routes/flashCardRoutes");
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(cookie());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
//all middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/AuthAPI",userRoutes);
app.use("/flashcard",flashCardRoutes);


const port = process.env.port;
app.listen(port,(err)=>{
    if(!err){
        console.log(`the server is running in this port http://localhost:${port}/AuthAPI`);
        console.log(`the server is running in this port http://localhost:${port}/flashcard`);
    }
    else{
        console.log(`error aa raha hai ${err}`);
    }
});