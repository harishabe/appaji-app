var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currentDieasesModel = new Schema({
    doctorFirstName: String,
    doctorLastName: String,
    patientFirstName: String,
    patientLastName: String,
    patientCondition: String,
    patientRegularMedician: String,
    patientRegularMedicianComplicants: String,
    patientLaboratory: String,
    patientId: String,
    treatmentDate:String
});

var currentDieases = module.exports = mongoose.model("patientCurrentDieases", currentDieasesModel);

module.exports.savePatientCurrentCondition = function (currentDieasesObj, callback) {
    currentDieases.create(currentDieasesObj, callback);
};

module.exports.getPatientCurrentCondition = function (id, callback) {
    currentDieases.find({"patientId":id}, callback);
};
