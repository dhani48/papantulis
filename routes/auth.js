const express = require('express');
const router = express.Router();
const config = require('../config.js');
const DB      = require('../DB.js');
const jwt      = require('jsonwebtoken');
const app = express();

router.post("/login", function(req, res, next) {
    var username = req.body.username 
    var password = req.body.password
    var user = { 
      'username': username, 
      'role': 'admin' 
    } 
    DB.query(`SELECT * FROM users WHERE username = "${ username }"`, function (error, results, fields) {
        results = results[0]
        
        if (error) res.render('error', { error: err });
        if (!results) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        else if (results) {
        // check if password matches
            if (results.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                
                const payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    admin: results.admin 
                };
                var token = jwt.sign(payload, req.app.get('superSecret'));
        
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Successefully authorized',
                    token: token
                });
            }   
        }
    });
  
})

module.exports = router;
