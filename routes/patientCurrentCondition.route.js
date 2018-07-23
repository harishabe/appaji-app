var express = require('express');
var router = express.Router();
var patientCurrentConditionModel = require('./../model/patientCurrentCondition.model');

/*** POST REQUEST ***/
router.post('/patientCurrentCondition', function (req, res, next) {
    var patientCurrentObj = {};
    patientCurrentObj.doctorFirstName = req.body.doctorFirstName;
    patientCurrentObj.doctorLastName = req.body.doctorLastName;
    patientCurrentObj.patientFirstName = req.body.patientFirstName;
    patientCurrentObj.patientLastName = req.body.patientLastName;
    patientCurrentObj.patientCondition = req.body.patientCondition;
    patientCurrentObj.patientRegularMedician = req.body.patientRegularMedician;
    patientCurrentObj.patientRegularMedicianComplicants = req.body.patientRegularMedicianComplicants;
    patientCurrentObj.patientLaboratory = req.body.patientLaboratory;
    patientCurrentObj.patientId = req.body.patientId;
    patientCurrentObj.treatmentDate = req.body.treatmentDate;
    patientCurrentConditionModel.savePatientCurrentCondition(patientCurrentObj, function (error, resData) {
        if (error) {
            throw error;
        } else {
            res.json({ sucess: true, message: 'Successfully Saved' });
        }
    });
});

/*** GET REQUEST ***/
router.get('/getPatientCurrentCondition/:_id', function (req, res, next) {
    var id = req.params._id;
    patientCurrentConditionModel.getPatientCurrentCondition(id, function (error, resData) {
        if (error) {
            throw error;
        }
        res.json({ success: true, patientCurrentCondition: resData });
    });
});

module.exports = router;