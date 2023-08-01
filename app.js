// External Imports
const express = require("express");
require("dotenv").config();
const mongoose  = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
// Internal Imports
const {notFoundHandler, errorHandler} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();

// Variables
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

// Datanase connection
const connectDb = async () =>{
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to the Databse");
    } catch(error){
        console.log(error.message);
    }
}
connectDb();

// Middlewares
// Request Parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Static Folder
app.use(express.static(path.join(__dirname, "public")));
// Parse Cookies
app.use(cookieParser(COOKIE_SECRET));

// View Engine
app.set("view engine", "ejs");

//Routing
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// Handle Errors
// 404
app.use(notFoundHandler);
// Common Error Handle
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`);
});