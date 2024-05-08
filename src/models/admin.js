const mongoose = require("mongoose");
require("../db/conn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    access:{
        type: String,
        required:true
    },
    status:{
        type: String,
        default:"Active"
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
});

adminSchema.methods.generateToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id.toString()},process.env.KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}
adminSchema.methods.loginToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id.toString()},process.env.KEY);
        this.tokens = this.tokens.concat({token:token});
        return token;
    } catch (error) {
        console.log(error);
    }
}

adminSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})
const Admin = new mongoose.model("Admin",adminSchema);

// const insert = new Admin({
//     username:"rakesh",
//     password:"rakesh",
//     access:"high"
// })
// insert.save();
module.exports = Admin;