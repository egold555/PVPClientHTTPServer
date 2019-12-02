var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {

    app.get('/api/cosmetics', (req, res) => {

        //SELECT * FROM `hwidban` WHERE hwid = 'testhwid'
        database.query("SELECT * FROM `cosmetics` ", function (err, rows, fields) {

            if (err) {
                throw err;
            }

            var objs = [];
            for (var i = 0; i < rows.length; i++) {
                
                var row = rows[i];
                
                var hat = new Object();
                
                hat.enabled = row.hat_enabled;
                hat.r = row.hat_color_r;
                hat.g = row.hat_color_g;
                hat.b = row.hat_color_b;
                
                objs.push({
                    uuid: row.uuid,
                    cape_style: row.cape_style,
                    hat: hat,
                    googly_eyes: row.googly_eyes
                });
            }

            responseUtils.success(res, JSON.stringify(objs));

        });

    });

}
