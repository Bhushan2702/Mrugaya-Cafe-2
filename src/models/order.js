const mongoose = require("mongoose");
require("../db/conn");
require('dotenv').config();

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
   table_no:{
        type: String,
        required:true
    },
    menu_items:{
        type: [String],
        required:true
    },
    item_quantity:{
        type: [Number],
        required:true
    },
    price:{
        type: String,
        required:true
    }    
});
const Order = new mongoose.model("Order",menuSchema);

module.exports = Order;