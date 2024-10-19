import User from "../models/userModels.js";
import jwtToken from '../utils/jwtToken.js';


export const userRegister = async(req,res)=>{
    try {
        const {Fullname,Username,Email,Password,Gender,ProfilePic}=req.body;
        const user = await User.findOne({Username,Email});
         if(user) return res.status(500).send({success:false,message:"username or email already exist"});
        const hashPassword = await(Password);
        const ProfileBoy = ProfilePic || `https://avatar.iran.liara.run/public/boy?Username =${Username}`;
        const ProfileGirl= ProfilePic || `https://avatar.iran.liara.run/public/girl?Username =${Username}`;
         
        const newUser1 = new User({
            Fullname,
            Username,
            Email,
            Password:hashPassword,
            Gender,
            ProfilePic: Gender === "Male"? ProfileBoy:ProfileGirl
        })
        if(newUser1){
            await newUser1.save();
            jwtToken(newUser1._id,res)
        }else{
             res.status(500).send({ success:false ,message:"Invalid user data"});
        }
        res.status(201).send({
            _id:newUser1._id,
            Fullname:newUser1.Fullname,
            Username:newUser1.Username,
            ProfilePic:newUser1.ProfilePic,
            Email:newUser1.Email,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(error);
    }
}

export const userLogin=async(req,res)=>{
    try{
     const {Email , Password} = req.body;
     const user = await User.findOne({Email})
     if(!user) return res.status(500).send({ success:false ,message:"Invalid email"});
     const comparePass = await(Password === user.Password || "");
     if(!comparePass) return res.status(500).send({ success:false ,message:"Wrong Password"});
     jwtToken(user._id,res)


     res.status(200).send({
        _id:user._id,
        Fullname:user.Fullname,
        Username:user.Username,
        ProfilePic:user.ProfilePic,
        Email:user.Email,
        message:"Successful Login"
     })
    }catch(error){
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(error);
    }
}

export const userLogout=async(req,res)=>{
   try{
    res.cookie('jwt','',{
        maxAge:0
    })
    res.status(200).send({message:"User logout"})
}catch{
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(error);
   }
}