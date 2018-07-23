var express = require('express');
var router = express.Router();
var doctorSignUpModel = require('./../model/doctorSignUp.model');

/*** POST REQUEST ***/
router.post('/signUp', function (req, res, next) {
    doctorSignUpModel.count({
        $or: [
            { firstName: req.body.firstName },
            { lastName: req.body.lastName },
            { email: req.body.email }
        ]
    }, function (error, resData) {
        if (resData > 0) {
            res.json({ success: false, message: 'User Already Exist.Please Register' });
        } else {
            var doctorObj = {};
            doctorObj.firstName = req.body.firstName;
            doctorObj.lastName = req.body.lastName;
            doctorObj.email = req.body.email;
            doctorObj.phoneNumber = req.body.phoneNumber;
            doctorObj.password = req.body.password;
            doctorSignUpModel.signUpDoctor(doctorObj, function (error, responseData) {
                if (error) {
                    throw error;
                } else {
                    res.json({ success: true, message: 'Successfully Registered' });
                }
            });
        }
    });
});

module.exports = router;
