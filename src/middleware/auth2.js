// const jwt = require("jsonwebtoken");
// const Admin = require("../models/admin");

// const auth2 = async(req, res, next)=>{
//     try {
//         const token = req.cookies.ajwt;
//         const verifyUser = jwt.verify(token, "Theseceretkeyisrequiredtopasswiththetoken");
//         const user = await Admin.findOne({_id:verifyUser._id});

//         req.token = token;
//         req.user = user;
//         next();
//     } catch (error) {
//         // res.status(401).send(error);
//         res.redirect("login");
//     }
// }

// module.exports = auth2;