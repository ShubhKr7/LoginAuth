//This below line of code means if the application is under "production" which simply means that if it's being used by a user then don't send any 
// variables from the .env file as it contains sensitive information which we don't want user to access.
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

//Importing all the required libraries
const express=require('express');
const path=require('path');
const passport = require('passport');
const flash=require('express-flash');
const session=require('express-session');
const mehtodOverride = require('method-override');

const app=express();

//getting router
const routes=require('./routes/route');

//connecting to the database
const {connectToMongoDB}=require('./connection/connection');
connectToMongoDB("mongodb://localhost:27017/AuthenticationDataset");

//Setting up and using passport.js
const {initialize}=require('./passport-config');
initialize(passport);


//middlewares
app.set('view-engine', "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(mehtodOverride('_method'));

//Using the routes here
app.use("/",routes);


app.listen(7070,()=>{console.log("Server is Live now!");});