import { Server } from "socket.io";
import http from 'http';
import express from "express";
import cors from 'cors';


const app = express();


const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:'GET,POST',
        allowedHeaders:'Content-Type','Authorization',
        credentials:true,
    }
});

export const getReceiverSocketId = (receiverId)=>{
    return userSocketmap[receiverId];
};

const userSocketmap ={};
io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;

    if(userId !== "undefine")userSocketmap[userId] = socket.id;
    io.emit('getOnlineUsers',Object.keys(userSocketmap))

    socket.on('disconnect',()=>{
        delete userSocketmap[userId],
        io.emit('getOnlineUsers',Object.keys(userSocketmap))
    });
});

export {app , io , server}