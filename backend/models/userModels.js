import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    Fullname:{
        type:String,
    },
    Username:{
        type:String,
    },
    Email:{
        type:String,
        unique:true
    },
    Password:{
        type:String,
   },
    Gender:{
        type:String,
        enum:["Male","Female"],
    },
    ProfilePic:{
        type:String,
        default:"",
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;