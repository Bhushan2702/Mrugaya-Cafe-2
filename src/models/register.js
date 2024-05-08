const mongoose = require("mongoose");
require("../db/conn")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const registerSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true
    },
    middle_name:{
        type: String,
        required:true
    },
    last_name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    gender:{
        type: String,
        required:true
    },
    mobile:{
        type: Number,
        required:true,
    },
    password:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required:true
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
});

registerSchema.methods.generateToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id.toString()},process.env.KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}
// registerSchema.methods.loginToken = async function(){
//     try {
//         const token = await jwt.sign({_id:this._id.toString()},process.env.KEY);
//         // console.log(token);
//         return token;
//     } catch (error) {
//         console.log(error);
//     }
// }

registerSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})
const Register = new mongoose.model("Register",registerSchema);

module.exports = Register;