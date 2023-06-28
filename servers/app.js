const {readdirSync} = require('fs');
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const {PORT,DATA_BASE} = process.env;

// app.use....

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());


// router cunnect....

readdirSync('./routers').map(R => app.use("/api/v1",require(`./routers/${R}`)));

// error section..
app.use('*',(req,res)=>{
    res.status(404).json({status:"Fail",message:"This Route Not Found."});
});

// server error section...
app.use((err,req,res)=>{
    res.status(400).json({status:"Fail",message:err});
});

// export....
module.exports = {PORT,app,mongoose,DATA_BASE};