var express = require('express');
var router = express.Router();
var middleware    = require("../middleware");
var passport= require("passport");

router.use(function(req,res,next){
  res.locals.currentUser=req.user;
  
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/login",function(req, res) {
   
  res.render("login");
});
router.post("/login",passport.authenticate("local",
{
   failureRedirect:"/" ,successRedirect:"/landing"
    }),function(req, res) {
});
router.get("/signup",function(req, res) {
   
  res.render("signup");
});
router.get("/logout",function(req, res) {
  req.logout();
  // req.flash("error","Logged you out!");
  res.redirect("/");
});
router.get("/landing",middleware.IsloggedIn,function(req,res){
  res.render("landing");
});
module.exports = router;
