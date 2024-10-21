import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import messageRouter from "./rout/messageRout.js";
import authRouter from "./rout/authUser.js";
import userRouter from "./rout/userRout.js"
import cookieParser from 'cookie-parser';
import path from 'path';

import {app,server} from './socket.io/socket.js';

const __dirname = path.resolve();
dotenv.config().parsed;
const db = process.env.URL;

main()
.then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(db); 
}

app.use(express.json());
app.use(cookieParser());


app.use("/api/authh",authRouter);
app.use("/api/message",messageRouter);
app.use("/api/user",userRouter);

app.use(express.static(path.join(__dirname,"/frontened/dist")))


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontened","dist","index.html"))
});


const PORT = process.env.PORT || 3000

server.listen(PORT,()=>{
    console.log(`working at ${PORT}`);
});