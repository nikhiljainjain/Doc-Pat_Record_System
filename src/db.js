var mongoose = require ('mongoose');


mongoose.Promise = global.Promise;

//change the database with yours
mongoose.connect("mongodb://Aadish09:QWERTY1234@ds123971.mlab.com:23971/tbc");

module.exports = {mongoose};