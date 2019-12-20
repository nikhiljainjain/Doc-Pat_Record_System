var middlewareObj = {};
var User         = require("../models/users");

middlewareObj.Owner= function(req,res,next){
    if(req.isAuthenticated())
    {User.findById(req.params.id,function(err,foundUser){
        
       if(err)
       {
           res.redirect("/users/login");
       }else{
            if(foundUser.username.equals(req.username)){
               next();
            }
            else{ 
               res.send("You do not have permission");
            }
        }
        });
    }else{
       res.redirect("/users/login");
         }
    
};
middlewareObj.IsloggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    // req.flash("error","Please Login First!");
    res.redirect("/users/login");
};
module.exports = middlewareObj;