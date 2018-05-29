const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const path      = require('path');
const config = require('./config.js');
const jwt      = require('jsonwebtoken');

const app = express();

// if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
// }

// FOR CMS
const cmsPlaces = require('./routes/cms/cmsPlaces');

// FOR WEBSITE
const places = require('./routes/places');
const auth = require('./routes/auth');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('superSecret', config.app.secret); // secret variable

var apiRoutes = express.Router(); 

apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
          return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });



app.use(express.static(__dirname + '/src'));
  

// ROUTES FOR CMS
app.use('/api/auth', auth);
app.use('/api/cms', apiRoutes);
app.use('/api/cms/places', cmsPlaces);

//ROUTES FOR WEBSITE
app.use('/api/places', places);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'))
  })

app.listen(3002);
