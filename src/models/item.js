const mongoose = require("mongoose");
require("../db/conn");
require('dotenv').config();

const itemSchema = new mongoose.Schema({
    item_name:{
        type: String,
        required:true
    },
    menu_code:{
        type: String,
        required:true
    },
    item_code:{
        type: String,
        required:true
    },
    item_image:{
        type: String,
        required:true
    },
    price:{
        type: String,
        required:true
    }    
});
const Item = new mongoose.model("Item",itemSchema);
// const insert = new Item(
// {
//     name:"Pani Puri",
//     menu_code:"1",
//     item_code:"a",
//     item_image:"../../static/img/imgs/pani-puri.jpg",
//     price:"20"
// },
// {
//     name:"Bhel Puri",
//     menu_code:"1",
//     item_code:"b",
//     item_image:"../../static/img/imgs/shev-puri.jpg",
//     price:"30"
// },
// {
//     name:"Shev Puri",
//     menu_code:"1",
//     item_code:"c",
//     item_image:"../../static/img/imgs/bhel-puri.jpg",
//     price:"30"
// },
// {
//     name:"Pizza",
//     menu_code:"2",
//     item_code:"d",
//     item_image:"../../static/img/imgs/pizza.jpg",
//     price:"80"
// },
// {
//     name:"Veg Cheez Pizza",
//     menu_code:"2",
//     item_code:"e",
//     item_image:"../../static/img/imgs/veg-cheez-pizza.jpg",
//     price:"100"
// },
// {
//     name:"Paneer Pizza",
//     menu_code:"2",
//     item_code:"e",
//     item_image:"../../static/img/imgs/paneer-pizza.jpg",
//     price:"150"
// },
// )
// insert.save();
module.exports = Item;