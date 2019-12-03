/*

Insert HWID, UUID, and USERNAME into database if it doesn't exist.
If it does exist, update username and UUID for that given HWID.
TODO: Mutiple usernames / uuid per hwid
https://github.com/egold555/PVPClientHTTPServer/issues/5

*/


var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {
    
    app.post('/api/mapUUID', (req, res) => {
        
        //Post variables
        var uuid = req.body.uuid;
        var hwid = req.body.hwid;
        var username = req.body.username;

        //Query the database
        //Preform action on database
        //Insert HWID, UUID, and USERNAME into database if it doesn't exist.
        //If it does exist, update username and UUID.
        //TODO: Mutiple usernames / uuid per hwid
        //https://github.com/egold555/PVPClientHTTPServer/issues/5
        
        database.query("REPLACE INTO usermap(uuid, hwid, username) VALUES('" + uuid + "', '" + hwid + "', '" + username + "')", function (err, result, fields) {

            //Proper way of doing it!
            //https://github.com/egold555/PVPClientHTTPServer/issues/6
            if (err) {
                responseUtils.error("500 Error. See console.");
                console.log(err);
                return;
            }
            
            //console.log(uuid + " - " + hwid + " - " + username);
            responseUtils.success(res, "200 OK");

        });
    });
    
}