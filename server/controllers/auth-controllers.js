const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

const home = async(req,res)=>{
    try {
        res.status(200).send("Welcome to Page uaing Express Router Node controller");
    } catch (error) {
        console.log(error);
    }
};
const register = async(req,res)=>{
    try {
        // console.log(req.body);
        const {username, email, phone, password } = req.body;
        
        const userExist = await User.findOne({email});
        if(userExist){
            console.log("Email already exists");
            return res.status(400).json({msg: "email already exist"});
        }

        const userCreated = await User.create({username, email, phone, password});
        
        res.status(200).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(), 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Error in Register Controller");
    }
};

//login 
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const userExist = await User.findOne({email});
        // console.log(userExist);
        if(!userExist){
            return res.status(400).json({msg: "Invalid Credentials" });
        }

        
        const user = await userExist.comparePassword(password);
        if(user){
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }else{
            res.status(401).json({msg: "Invalid Email or Password"});
        }

    } catch (error) {
        res.status(500).json({msg: "Error in Login Controller"});
    }
};


module.exports = {home, register, login};
