const express = require("express");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const multer = require('multer');
const flash = require('connect-flash');
require("../src/db/conn");
const Mongoose = require("../src/db/conn");
const Register = require("../src/models/register");
const auth = require('../src/middleware/auth');
const session = require('express-session');
require('dotenv').config();
const fs = require('fs');
const path = require("path");
const Order = require("../src/models/order");
const Item = require("../src/models/item");
const PDFDocument = require('pdfkit');


router.get('/', async (req, res) => {
  const session = {
    name: req.session.name,
    mobile_no: req.session.mobile_no
  };
  const name = req.session.name;
  console.log(session);
  console.log(name);
  res.status(200).render('index', { name, session: JSON.stringify(session) });
});
router.get('/index', async (req, res) => {
  const session = {
    name: req.session.name,
    mobile_no: req.session.mobile_no
  };
  const name = req.session.name;
  res.status(200).render('index', {name, session: JSON.stringify(session)});
});
router.get('/coffee', async (req, res) => {
  res.status(200).render('coffee', {});
});
router.get('/pizza', async (req, res) => {
  res.status(200).render('pizza', {});
});
router.get('/sandwich', async (req, res) => {
  res.status(200).render('sandwich', {});
});
router.get('/checkout', async (req, res) => {
  const sessionData = {
    name: req.session.name,
    mobile_no: req.session.mobile_no,
    table_no: req.session.table_no
  };
  res.status(200).render('checkout', { sessionData: JSON.stringify(sessionData) });
});

router.post('/login', (req, res) => {
  const { name, mobile_no } = req.body;
  // Validate the user input if necessary
  // Store user data in session
  req.session.name = name;
  req.session.mobile_no = mobile_no;
  res.redirect('/'); // Redirect to the menu page after successful login
});

router.get('/menu/:id', async (req, res) => {
  const menu_code = req.params.id;
  const item = await Item.find({ menu_code });
  const currentMenuPageUrl = req.originalUrl; // Get the current page's URL
  res.status(200).render('item', { item, currentMenuPageUrl });
});

router.get('/cart', async (req, res) => {
  const items_data = await Item.find().select('-_id item_name price');;
  const previousPageUrl = req.query.previousPageUrl; // Get the previous page's URL from the query parameter
  const sessionData = {
    name: req.session.name,
    mobile_no: req.session.mobile_no
  };
  res.status(200).render('cart', { previousPageUrl, sessionData: JSON.stringify(sessionData), items_data: JSON.stringify(items_data) });
});

router.post('/place-order', async (req, res) => {
  try {
    // Extract order data from request body
    const { name, mobile_no, menu_items, item_quantity, price } = req.body;

    // Convert item_quantity string to an array of numbers
    const itemQuantityArray = item_quantity.split(',').map(quantity => parseInt(quantity.trim()));
    // Create a new order document
    const order = new Order({
      name,
      table_no: mobile_no,
      menu_items,
      item_quantity: itemQuantityArray,
      price
    });

    // Save the order to the database
    await order.save();
    // Respond with success message
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', error });
  }
});

const pdf = require('html-pdf');
const Handlebars = require('handlebars');

router.post('/generate-bill-pdf', (req, res) => {
  // Retrieve order data from request body
  const { name, mobile_no, menu_items, item_quantity, price } = req.body;
  // Parse the price string into an array of prices
  const priceArray = price.split(',').map(price => parseFloat(price));

  // Calculate total price
  const totalPrice = priceArray.reduce((acc, curr) => acc + curr, 0).toFixed(2);
  // Convert menu_items string to an array
  const item_quantity_Array = item_quantity.split(',').map(item => item.trim());
  const menuItemsArray = menu_items.split(',').map(item => item.trim());

  // Load the HTML template
  const htmlTemplatePath = './static/template.html'; // Replace with the path to your HTML template
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8');

  // Compile the HTML template using Handlebars
  const template = Handlebars.compile(htmlTemplate);

  // Replace placeholders in the HTML template with actual order data
  const replacedHtmlTemplate = template({
    name,
    mobile_no,
    items: menuItemsArray.map((itemName, index) => ({
      itemName,
      itemQuantity: item_quantity_Array[index],
      itemPrice: priceArray[index]
    })),
    totalPrice: totalPrice
  });

  // Convert HTML to PDF
  pdf.create(replacedHtmlTemplate).toStream((err, stream) => {
    if (err) {
      console.error('Error generating bill PDF:', err);
      res.status(500).send('Error generating bill PDF');
      return;
    }

    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="bill.pdf"');

    // Pipe PDF stream to response
    stream.pipe(res);
    
    // Clear session data
    req.session.destroy();

    // Clear cookie
    res.clearCookie('listCart');

  });
});



module.exports = router;