const mongoose = require("mongoose");
require("../db/conn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const billingSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    mobile_no:{
        type: String,
        required:true
    },
   table_no:{
        type: String,
        required:true
    },
    menu_items:{
        type: String,
        required:true
    },
    item_quantity:{
        type: String,
        required:true
    },
    price:{
        type: String,
        required:true
    },
    total:{
        type: String,
        required:true
    }
});
const Billing = new mongoose.model("Billing",billingSchema);



module.exports = Billing;