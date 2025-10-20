const express = require("express");
const app = express();
const port = 8080 || 3000 ;
const cors = require("cors");


const Customer = require("./models/Customer");
const User = require("./models/user"); 

//routes
const customerRoutes = require("./routes/customer");

//auth routes
const authRoutes = require("./routes/auth");


//grequiring the db connection function
const connectDB = require("./config/db");

app.use(express.json());         
app.use(cors({
  origin: "https://ownease.vercel.app/"
}));

//logging every request


//mongo connect fucntion in config/db
connectDB();

//routing
app.use("/", customerRoutes);

//auth routing
app.use("/auth",authRoutes);


//server
app.listen(port,()=>
{
    console.log("Server is working successfully on port : " + port);
});
