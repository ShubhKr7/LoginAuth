const { name } = require('ejs');
const dataset=require('../models/model');
const bcrypt=require('bcrypt');


async function createNewEntry(req,res){
        if(data) { 
            if(data.email==req.body.email)
            return res.redirect("/register");}
    else{
        const hashedPass= await bcrypt.hash(req.body.password, 9);
        await dataset.create({    
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPass       
    });
    return res.redirect('/login');
    }}

    function showHomePage(req,res){
        res.render("index.ejs");
    }

    function registerPage(req,res){
        res.render("register.ejs");
    }

    function showLoginPage(req,res){
        res.render("login.ejs");
    }

    function checkAutheticated(req,res,next){
        if(req.isAuthenticated()) return next();
        return res.redirect("/login");
    }

    function checkNotAutheticated(req,res,next){
        if(req.isAuthenticated()) 
        return res.redirect("/");
        return next();
    }

    

    module.exports={createNewEntry, registerPage, showLoginPage, checkAutheticated, checkNotAutheticated, showHomePage};