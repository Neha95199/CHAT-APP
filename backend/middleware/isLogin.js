import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const isLogin=(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    
    if(!token) return res.status(500).send({success:false,message:"User Unauthorize"});
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    if(!decode) return res.status(500).send({success:false,message:"User Unauthorize-Invalid Token"});
    const user = User.findById(decode.userId).select("-Password");
    if(!user) return res.status(500).send({success:false,message:"user not find"});
    req.user = user,
    next()
  } catch (error) {
    console.log(`error is inLogin middleware ${error.message}`);
    res.status(500).send({
        success:false,
        message:error
    })
    console.log(error);

  }
}
export default isLogin;