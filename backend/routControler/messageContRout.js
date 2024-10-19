import Conversation from "../models/conversationSchema.js";
import Message from "../models/messageSchema.js";
import { getReceiverSocketId ,io} from "../socket.io/socket.js";

export const sendMessage=async(req,res)=>{
    try{
     const {message} = req.body;
     const {id:receiverId} = req.params;
     const senderId = req.user._conditions._id;

     let chats = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
     })
     if(!chats){
        chats = await Conversation.create({
            participants:[senderId,receiverId],

        })
     }
     const newMessage = new Message({
        senderId,
        receiverId,
        message,
        conversationId:chats._id
     })
     if(newMessage){
        chats.messages.push(newMessage._id)
     }
     await Promise.all([chats.save(),newMessage.save()])

     //SOCKET IO FUNCTION
     const receiverSocketId = getReceiverSocketId(receiverId);
     if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
     }
     res.status(201).send(newMessage)
    }catch(error){
      res.status(500).send({
         success:false,
         message:error
     })
     console.log(error);
 
    }
}

export const getMessage=async(req,res)=>{
   try {
      const {id:receiverId} = req.params;
     const senderId = req.user._conditions._id;
     
     const chats = await Conversation.findOne({
      participants:{$all:[senderId,receiverId]}
     }).populate("messages")

     if(!chats) return res.status(201).send([])
      const message = chats.messages;
   res.status(200).send(message)
      
   } catch (error) {
      res.status(500).send({
         success:false,
         message:error
     })
     console.log(error);
 
   }
}