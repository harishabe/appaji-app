var express = require('express');
var router = express.Router();
var patientRegsModel = require('./../model/patientRegs.model');

/*** POST REQUEST ***/
router.post('/patientRegstration', function (req, res, next) {
    patientRegsModel.count({
        $or: [
            { firstName: req.body.firstName },
            { lastName: req.body.lastName }
        ]
    }, function (error, resData) {
        if (resData > 0) {
            res.json({ success: false, message: 'Patient Already Exist.' });
        } else {
            var patientObj = {};
            patientObj.firstName = req.body.firstName;
            patientObj.lastName = req.body.lastName;
            patientObj.age = req.body.age;
            patientObj.gender = req.body.gender;
            patientObj.address = req.body.address;
            patientObj.phoneNumber = req.body.phoneNumber;
            patientObj.alernateNumber = req.body.alernateNumber;
            patientObj.booldGroup = req.body.booldGroup;
            patientObj.doctorId = req.body.doctorId;
            patientObj.regDate = req.body.regDate;
            patientObj.fingerPrint = req.body.fingerPrint;
            patientRegsModel.patientRegstration(patientObj, function (error, resData) {
                if (error) {
                    throw error;
                } else {
                    res.json({ success: true, message: 'Patient Successfully Registered' });
                }
            });
        }
    });
});

/*** GET REQUEST ***/
router.get('/patientDetails/:_id', function (req, res, next) {
    var id = req.params._id;
    patientRegsModel.getPatientDetails(id, function (error, resData) {
        if (error) {
            throw error;
        }
        res.json({ success: true, patientDetails: resData });
    });
});

/*** POST REQUEST ***/
router.post('/patientDetailFingurePrint', function (req, res, next) {
    var patientFingureObj = {};
    patientFingureObj.fingerPrint = req.body.fingerPrint;
    patientRegsModel.getPatientDetailFingurePrint(patientFingureObj, function (error, resData) {
        if (error) {
            throw error;
        }
        res.json({ success: true, patientDetails: resData });
    });
});

module.exports = router;
