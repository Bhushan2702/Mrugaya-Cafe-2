const express = require("express");
const path = require("path");
const hbs = require("hbs");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 80;
const userRoutes = require('../routes/router');
const adminRoutes = require('../routes/admin');
const session = require('express-session');
const flash = require('connect-flash');
const { log } = require("console");
require('dotenv').config();
// require("./db/conn")


app.use(session({
    secret:'nss',
    saveUninitialized: true,
    resave: true
}));
  
app.use(flash());
  
app.use('/static', express.static('static'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
  });
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, '../templates/views'));
app.use('',userRoutes);
app.use('',adminRoutes);

// const partialPath = path.join(__dirname, "templates/partials")
// hbs.registerPartials(partialPath);
hbs.registerPartials("templates/partials");

app.listen(port, ()=>{
    console.log(`The app started successfully on port ${port}`);
})