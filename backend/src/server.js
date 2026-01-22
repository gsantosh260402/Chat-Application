//const express = require('express');

import express from 'express';  // for this in package.json at a --- "type" : "module"
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);

app.listen(PORT , ()=>console.log("Server Running on Port 3000"));
