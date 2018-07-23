var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSignUpModel = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    password: String,
    admin: Boolean
});

var doctorSignUp = module.exports = mongoose.model("doctorSignUp", doctorSignUpModel);

module.exports.signUpDoctor = function (userObj, callback) {
    doctorSignUp.create(userObj, callback);
};