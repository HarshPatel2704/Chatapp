import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generatedToken.js";
export const signup=async (req,res)=>{
    const {fullname,email,password,confirmpassword} = req.body;
    try {
        if(password!==confirmpassword){
            return res.status(400).json({error:"password do not match"});
        }
        const user =await User.findOne({email});
        if(user){
            return res.status(400).json({error:"User already registered"});
        }
        //hashing the password
        const hashpassword=await bcrypt.hash(password,10);
        const newUser =await new User({
            fullname,
            email,
            password:hashpassword,
        });
        await newUser.save();
        if(newUser){
            createTokenAndSaveCookie(newUser._id,res);
            res.status(201).json({message:"User created successfully",
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                },
            });
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};
export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user= await User.findOne({email});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!user || !isMatch){
            return res.status(400).json({error:"Invaild user credential"});
        }
        createTokenAndSaveCookie(user._id,res);
        res.status(201).json({message:"User login successfully",
            user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};

export const logout = async(req,res)=>{
    try {
        res.clearCookie("jwt");
        res.status(200).json({message:"User Logout successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};

export const allUsers = async(req,res)=>{
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUser},
        }).select("-password");
        res.status(201).json(filteredUsers);
    } catch (error) {
        console.log("Error: in allUsers controller " + error);
    }
};