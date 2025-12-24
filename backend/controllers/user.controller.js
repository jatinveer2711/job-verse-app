import User from '../Model/User.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()


//Signup

export const signup = async (req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"})
            
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            role,
        })
       
        return res.status(201).json({message:"User created successfully",user:newUser})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// login 
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid creadentials"})
        }
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"})
        return res.status(200).json({message:"login successful",role:user.role,token,userId:user._id})
    } catch (error) {
        return res.status(500).json({message:error.message})
    };
};