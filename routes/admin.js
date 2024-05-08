const express = require("express");
const admin = new express.Router();
const Mongoose = require("../src/db/conn");
const Order = require("../src/models/order");
// const auth2 = require('../src/middleware/auth2');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const fs = require('fs').promises;

admin.get('/admin/dashboard', async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // // Process each order
        // for (const order of orders) {
        //     // Convert price string to array of numbers
        //     order.price = order.price.split(',').map(price => parseFloat(price));

        //     // Calculate the total price for the order
        //     const totalPrice = order.price.reduce((acc, curr) => acc + curr, 0);

        //     // Assign the total price to the order object
        //     order.totalPrice = totalPrice;
        // }

        // Render the template with orders and total prices
        res.status(200).render('admin/dashboard', { orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = admin;