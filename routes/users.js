var express = require("express");
var router  = express.Router();
var User    = require("../models/users");
var passport= require("passport");
var middleware    = require("../middleware");
router.use(function(req,res,next){
    res.locals.currentUser=req.user;
    
    next();
});

router.get("/login",function(req, res) {
   
    res.render("login");
});
router.post("/login",passport.authenticate("local",
{
    successRedirect:"landing",
    failureRedirect:"users/login"
    }),function(req, res) {
    
});
router.get("/signup",function(req, res) {
    res.render("signup");
});
router.post("/signup",function(req, res) {
    var  newuser=new User({username:req.body.username}) ;
    User.register(newuser,req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/users/login");
        });
    });
});
router.get("/logout",function(req, res) {
    req.logout();
    // req.flash("error","Logged you out!");
    res.redirect("/");
});
router.get("/landing",middleware.IsloggedIn,function(req,res){
    res.render("landing");
});



module.exports=router;