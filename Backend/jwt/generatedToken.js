import jwt from "jsonwebtoken";

const createTokenAndSaveCookie=(userId,res)=>{
    const token = jwt.sign({userId},process.env.jwt_Token,{
        expiresIn:"10d",
    });
    res.cookie("jwt",token,{
       httpOnly:true,
       secure:true,
       sameSite:"strict",
    });
};

export default createTokenAndSaveCookie;