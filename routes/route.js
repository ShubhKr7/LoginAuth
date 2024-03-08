const express=require('express');
const passport = require('passport');
const {createNewEntry, showHomePage,registerPage, showLoginPage, checkAutheticated, checkNotAutheticated}=require('../controllers/controller');

const router=express.Router();

//All GET routes handeled
router.get("/",checkAutheticated, showHomePage);

router.get("/register",checkNotAutheticated,registerPage);

router.get("/login",checkNotAutheticated,showLoginPage);

//All POST routed handeled
router.post("/register",createNewEntry);

router.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: '/login',
    failureFlash: true,
    session: true
}));

//Delete Request
router.delete('/logout', function logout(req,res){
    req.logOut((e)=>{});
    res.redirect('/');
});


module.exports=router;