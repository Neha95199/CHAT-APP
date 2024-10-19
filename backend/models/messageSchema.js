import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
      message:{
        type:String,
      },
      conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
      }
},{timestamps:true});

const Message = mongoose.model("Message",messageSchema);

export default Message;