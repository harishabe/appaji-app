var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientRegsModel = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    address: String,
    phoneNumber: Number,
    alernateNumber: Number,
    booldGroup: String,
    doctorId: String,
    regDate:String,
    fingerPrint:String
});

var patientRegs = module.exports = mongoose.model("patients", patientRegsModel);

module.exports.patientRegstration = function (userObj, callback) {
    patientRegs.create(userObj, callback);
};

module.exports.getPatientDetails = function (id, callback) {
    patientRegs.find({"doctorId":id}, callback);
};

module.exports.getPatientDetailFingurePrint = function (patientObj, callback) {
    patientRegs.find({"fingerPrint":patientObj.fingerPrint}, callback);
};