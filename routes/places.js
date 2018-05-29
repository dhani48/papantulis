const express = require('express');
const router = express.Router();
const config = require('../config.js');
const DB      = require('../DB.js');


router.get("/:placeUrl/detail", function(req, res, next) {
  var placeUrl = req.params.placeUrl
  console.log(placeUrl)
  DB.query(`SELECT * FROM places LEFT JOIN place_adresses ON places.id = place_id WHERE url = "${ placeUrl }"`, function (error, results, fields) {
    if (error) throw error;
    res.send(results[0])    
  });
})

router.get("/negative-reviews/:placeUrl", function(req, res, next) {
  var placeUrl = req.params.placeUrl
  console.log(placeUrl)
  DB.query(`SELECT review FROM place_reviews LEFT JOIN places ON places.id = place_id WHERE url = "${ placeUrl }" AND review_type = "N"`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)    
  });
})

router.get("/positive-reviews/:placeUrl", function(req, res, next) {
  var placeUrl = req.params.placeUrl
  console.log(placeUrl)
  DB.query(`SELECT review FROM place_reviews LEFT JOIN places ON places.id = place_id WHERE url = "${ placeUrl }" AND review_type = "P"`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)    
  });
})

router.get("/detail/:placeUrl", function(req, res, next) {
  var placeUrl = req.params.placeUrl
  DB.query(`SELECT * FROM places LEFT JOIN place_detail ON places.id = place_id WHERE url = "${ placeUrl }"`, function (error, results, fields) {
    if (error) throw error;
    console.log(results.length > 0, results[0])
    if(results.length > 0) {
      //convert facilities to array
       if(results[0]['facilities']) {
         var facilities = results[0]['facilities'].split(', ').join(',')
         facilities = facilities.split(",");
         results[0]['facilities'] = facilities
       }
       //convert alumni to array
       if(results[0]['notable_alumni']) {
        var notable_alumni = results[0]['notable_alumni'].split(', ').join(',')
        notable_alumni = notable_alumni.split(",");
        results[0]['notable_alumni'] = notable_alumni
       }
       //convert extra curricular to array
       if(results[0]['extra_curricular']) {
        var extra_curricular = results[0]['extra_curricular'].split(', ').join(',')
        extra_curricular = extra_curricular.split(",");
        results[0]['extra_curricular'] = extra_curricular
       }
     }


    res.send(results[0])    
  });
})

router.get("/place-images/:placeUrl", function(req, res, next) {
  var placeUrl = req.params.placeUrl
  DB.query(`SELECT * FROM places LEFT JOIN place_images ON places.id = place_id WHERE url = "${ placeUrl }"`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)    
  });
})

router.get('/', function(req, res, next) {
  console.log(req.query)
  // GET/users/ route
  DB.query('SELECT * FROM places LEFT JOIN place_adresses ON places.id = place_id', function (error, results, fields) {
    if (error) throw error;
    res.send(results)    
  });

});

router.get('/:placeUrl', function(req, res, next) {
  var placeUrl = req.params.placeUrl
  DB.query(`SELECT * FROM places LEFT JOIN place_adresses ON places.id = place_id WHERE url = "${ placeUrl }"`, function (error, results, fields) {
    if (error) throw error;
    res.send(results[0])    
  });

});



module.exports = router;
