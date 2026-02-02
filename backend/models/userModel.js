import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
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


// password hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.getJWTToken =function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE,
    });
}

userSchema.methods.verifyPassword = async function(userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword, this.password);
}

// generating token 

userSchema.methods.getResetPasswordToken = function(){
   
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
    
    
}

export default mongoose.model("User", userSchema);