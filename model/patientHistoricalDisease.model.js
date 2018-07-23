var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historicalDiseaseModel = new Schema({
    doctorFirstName: String,
    doctorLastName: String,
    patientFirstName: String,
    patientLastName: String,
    accident: String,
    surgeries: String,
    minorIllness: String,
    majorIllness: String,
    patientId: String,
    treatmentDate:String
});

var historicalDisease = module.exports = mongoose.model("patientHistoricalDisease", historicalDiseaseModel);

module.exports.saveHistoricalDisease = function (historicalDiseaseObj, callback) {
    historicalDisease.create(historicalDiseaseObj, callback);
};

module.exports.getPatientHistoricalDisease = function (id, callback) {
    historicalDisease.find({"patientId":id}, callback);
};
