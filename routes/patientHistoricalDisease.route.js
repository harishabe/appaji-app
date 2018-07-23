var express = require('express');
var router = express.Router();
var patientHistoricalDisease = require('./../model/patientHistoricalDisease.model');

/*** POST REQUEST ***/
router.post('/patientHistoricalDisease', function (req, res, next) {
    var patientHistoricalObj = {};
    patientHistoricalObj.doctorFirstName = req.body.doctorFirstName;
    patientHistoricalObj.doctorLastName = req.body.doctorLastName;
    patientHistoricalObj.patientFirstName = req.body.patientFirstName;
    patientHistoricalObj.patientLastName = req.body.patientLastName;
    patientHistoricalObj.accident = req.body.accident;
    patientHistoricalObj.surgeries = req.body.surgeries;
    patientHistoricalObj.minorIllness = req.body.minorIllness;
    patientHistoricalObj.majorIllness = req.body.majorIllness;
    patientHistoricalObj.patientId = req.body.patientId;
    patientHistoricalObj.treatmentDate = req.body.treatmentDate;
    patientHistoricalDisease.saveHistoricalDisease(patientHistoricalObj, function (error, resData) {
        if (error) {
            throw error;
        } else {
            res.json({ sucess: true, message: 'Successfully Saved' });
        }
    });
});

/*** GET REQUEST ***/
router.get('/getPatientHistoricalDisease/:_id', function (req, res, next) {
    var id = req.params._id;
    patientHistoricalDisease.getPatientHistoricalDisease(id, function (error, resData) {
        if (error) {
            throw error;
        }
        res.json({ success: true, patientHistoricalDisease: resData });
    });
});

module.exports = router;