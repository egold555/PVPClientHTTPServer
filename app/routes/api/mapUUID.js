var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {
    
    app.post('/api/mapUUID', (req, res) => {
        //INSERT INTO `clientusers` (`id`, `uuid`, `hwid`, `username`, `updated_time`) VALUES (NULL, 'uuid', 'hwid', 'username', NOW());
        var uuid = req.body.uuid;
        var hwid = req.body.hwid;
        var username = req.body.username;

        database.query("REPLACE INTO usermap(uuid, hwid, username) VALUES('" + uuid + "', '" + hwid + "', '" + username + "')", function (err, result, fields) {

            if (err) {
                
                responseUtils.error("500 Error. See console.");
                console.log(err);
                return;
            }

            console.log(uuid + " - " + hwid + " - " + username);
            responseUtils.success(res, "200 OK");

        });
    });
    
}