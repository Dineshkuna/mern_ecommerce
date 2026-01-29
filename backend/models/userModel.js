import mongoose from "mongoose";

import validator from "validator";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        reuired: [true, "Please provide a name"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name is too large"]

    },
    email: {
        type : String, 
        required: [true, "Please provide an email"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type : String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    avatar :  {
            public_id: {
                type:String,
                required:true
            },
            url: {
                type:String,
                required:true   
            }

        },    
    role : {
        type: String,
        default: "user" 
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

},{timestamps: true});


export default mongoose.model("User", userSchema);