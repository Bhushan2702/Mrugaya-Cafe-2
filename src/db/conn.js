const mongoose = require("mongoose");

//  For MongodbAtlas Cloud Connection 
 mongoose.connect("mongodb+srv://chalsebhushan2003:zfqGpWRST4cplRy1@cluster0.an0drvz.mongodb.net/wtproject")
 .then(() => console.log("Connection Successful...MongoDbAtlas"))
 .catch((err) => console.log(err));

/* For MOngodb localhost Connection 
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("Connection Successful...LocalHost"))
.catch((err)=>console.log(err)); */


module.exports = mongoose; 