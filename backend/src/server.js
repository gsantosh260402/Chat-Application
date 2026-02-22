//const express = require('express');

import express from 'express';  // for this in package.json at a --- "type" : "module"
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from 'path';
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
dotenv.config();

const app = express();
const __dirname = path.resolve();


const PORT = process.env.PORT || 3000;

app.use(express.json()); // to read req.body;
app.use(cookieParser());
app.use( fileUpload({ useTempFiles:true, tempFileDir:"/tmp", }) )

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);

// make ready for deployment

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")));
    app.get("*" , (_, res)=>{
        res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"));
    })
}


app.listen(PORT , ()=>{
    console.log("Server Running on Port: " , PORT);
    connectDB();

});
