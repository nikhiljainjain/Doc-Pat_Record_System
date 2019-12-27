var mongoose                =     require("mongoose");
var passportLocalMongoose   =     require("passport-local-mongoose");
var userSchema              =     new mongoose.Schema({
    name : String,
    id: Number,
    specialization:String, 
    username:String,
    isDoc:Boolean,
    password:String,
    patient:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Patient"
        }
        ],
    appointment:[]
    


});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);