import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import "dotenv/config";

export const signup = async (req , res)=>{
    const {fullName , email , password} = req.body;

    try{

        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are Required"});
        }
    
        if(password.length < 6){
            return res.status(400).json({message : "Password must be atleast 6 characters"});
        }

        //check if email is valid : regex

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message : "Invalid email format"});
        }

        // check if user is already

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message : "Email already exists"})
        
        // 123456b => hash the password - $##Ezdsfrweas - example
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = new User ({
            fullName , 
            email , 
            password : hashedPassword,
        })

        if(newUser){
            
            const savedUser = await newUser.save();
            generateToken(savedUser._id , res);

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email:newUser.email,
                profilePic : newUser.profilePic,
            })

            try{
                await sendWelcomeEmail(savedUser.email , savedUser.fullName , process.env.CLIENT_URL);
            }catch(error){}
        }else{
            res.status(400).json({message : "Invalid user Data"});
        }
    }catch(error){
         console.log("Error in signup controller . " , error);
         res.status(500).json({message : "Internal Server Error"})
    }
}

export const login = async(req , res)=>{

    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({message : "Email and password are required"});
    }
    try{
        const user = await User.findOne({email});
        if(!user)
           return res.status(400).json({message : "Invalid Credentials"});

        const isPasswordCorrect = await bcrypt.compare(password , user.password);

        // bcrypt db me stored passwordse salt nikal ta hai phir , new password ko usssi salt ke saath hash karta hai 
        // phir iss hashed password ko db me stored paasword se compare karta hai

        if(!isPasswordCorrect)
             return res.status(400).json({message : "Invalid Credentials"});

        generateToken(user._id , res);

        res.status(201).json({
            _id : user._id,
            fullName : user.fullName,
            email:user.email,
            profilePic : user.profilePic,
        })


    }catch(error){
        console.error("Error in login Controller:" , error)
        res.status(500).json({message:"Internal server error"});
    }
}

export const logout = (_ , res)=>{
    res.cookie("jwt" , "" , {maxAge:0});
    res.status(200).json({message : "Logged Out Successfully"})
}