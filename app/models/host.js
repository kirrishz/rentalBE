var mongoose = require('mongoose');
//schema to our host details
var hostSchema = mongoose.Schema({
firstName:{type:String},
lastName:{type:String},
email:{type:String},
nic:{type:String},
address:{type:String},
phonenumber:{type:Number},
model: {type:String},
no:{type:String},
fdate:{type:Date},
udate: {type:Date},
ins: {type:String},
tax:{type:String},
carId:{type:String}

});


module.exports = mongoose.model('host', hostSchema);
