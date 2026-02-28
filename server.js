const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

app.use(express.json());
app.post('/',(req,res)=>{
    console.log(req);
})

dotenv.config();
const PORT = process.env.PORT || 6000;
app.listen(PORT,()=>{
    console.log(`the server is running in this port http://localhost:${PORT}`);
})