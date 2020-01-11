/*

Prints out JSOn of every users cosmetics from the database
Example:
[
  {
    "uuid": "575973e5-e497-3cb3-bb63-d114ffcff0b1",
    "cape_enabled": 0,
    "cape_style": null,
    "hat": {
      "enabled": 0,
      "r": 255,
      "g": 0,
      "b": 255
    },
    "googly_eyes": 1
  },
  {
    "uuid": "575973e5-e497-3cb3-bb63-d114ffcff0b2",
    "cape_enabled": 1,
    "cape_style": "smiley_face",
    "hat": {
      "enabled": 0,
      "r": 0,
      "g": 0,
      "b": 0
    },
    "googly_eyes": 1
  }
]


Use JS objects as json blocks, see hat for example

*/

var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {

    app.get('/api/cosmetics', (req, res) => {

        //Query the database for everyones cosmetics
        database.query("SELECT * FROM `cosmetics` ", function (err, rows, fields) {

            if (err) {
                throw err;
            }

            var objs = [];
            
            //loop through all rows, and grab the data
            for (var i = 0; i < rows.length; i++) {
                
                var row = rows[i];
                
                //Creates a hat object for cosmetics with mutiple settings.
                //Not really needed, but I find it more easy to read and understand what the json is
                var hat = new Object();
                
                hat.enabled = row.hat_enabled;
                hat.r = row.hat_color_r;
                hat.g = row.hat_color_g;
                hat.b = row.hat_color_b;
                
                //push a new object containing the fields to the array
                objs.push({
                    uuid: row.uuid,
                    cape_enabled: row.cape_enabled,
                    cape_style: row.cape_style,
                    hat: hat,
                    googly_eyes: row.googly_eyes
                });
            }
            
            //respond with 200 success and the json string
            responseUtils.success(res, JSON.stringify(objs));

        });

    });

}
