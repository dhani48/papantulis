const express = require('express');
const router = express.Router();
const config = require('../../config.js');
const DB      = require('../../DB.js');
const multer = require('multer');

let upload = multer();

router.post('/add-place', upload.fields([]), function(req, res, next) {
    var url = req.body.name.toLowerCase();
    url = url.replace(/\s/g, "-");
    DB.query(`INSERT INTO places (name, logo, type_id, level, url) VALUES ('${req.body.name}', '${req.body.logo}', '1', '${req.body.level}', '${url}')`, function (error, results, fields) {
      if (error) throw error;
      var insertId = results.insertId;
      DB.query(`INSERT INTO place_detail (place_id, facilities, extra_curricular, curriculum, notable_alumni, phone, website, facebook, instagram, twitter)
        VALUES ('${insertId}', '${req.body.facilities}', '${req.body.extra_curricular}', '${req.body.curriculum}', '${req.body.notable_alumni}', '${req.body.phone}', '${req.body.website}', '${req.body.facebook}', '${req.body.instagram}', '${req.body.twitter}')`, 
        function(error, results, fields) {
          if (error) throw error;
         
          DB.query(`INSERT INTO place_adresses (place_id, address, city, district, province)
            VALUES ('${insertId}', '${req.body.address}', '${req.body.city}', '${req.body.district}', '${req.body.province}')`, 
            function(error, results, fields) {
              if (error) throw error;
            
              res.send(results)
         })
      })

    });
  });

  router.get('/all-places', function(req, res, next) {
    console.log(req.query)
    // GET/users/ route
    DB.query('SELECT * FROM places LEFT JOIN place_adresses ON places.id = place_id', function (error, results, fields) {
      if (error) throw error;
      res.send(results)    
    });
  
  });

  router.post('/delete-place',upload.fields([]), function(req, res, next) {
    var place_id = req.body.id
    console.log(place_id)
    // GET/users/ route
    DB.query(`DELETE place_adresses, place_detail
      FROM place_detail
      LEFT JOIN place_adresses ON place_adresses.place_id = place_detail.place_id
      LEFT JOIN place_reviews ON place_reviews.place_id = place_detail.place_id
      WHERE place_detail.place_id = ${ place_id }`, 
      function (error, results, fields) {
        if (error) throw error;
        DB.query(`DELETE FROM places WHERE id = ${ place_id }`, function (error, results, fields) {
          if (error) throw error;
          res.send(results)    
        });
      }
    );
  
  });

module.exports = router;
  