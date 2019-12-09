/*

Given a HWID, returns if they are banned or not.

Example json returned:

{
  "hwid": "hwid-passed-in",
  "isBanned": 1
}

*/

var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {
    
    //GET
    app.get('/api/isBanned', (req, res) => {
        
        //?hwid=
        var hwid = req.query.hwid;

        //Query the database for the hwid
        database.query("SELECT * FROM `hwidban` WHERE hwid = '" + hwid + "'", function (err, result, fields) {

            //Not sure when a error would occurr
            //Best to echo it as JSON
            //TODO: Fix server crash here
            if (err) {
                throw err;
            }
            
            var toReturn = result[0];
            //If we don't exist in the database, pretend we do. Just incase. Rules out the case of brute forcing hwid's
            if(toReturn == undefined) {
                try {
                    toReturn = JSON.parse('{"hwid": "' + hwid + '", "isBanned": 0}');
                }
                catch(e){
                    toReturn = JSON.parse('{"hwid": "undefined", "isBanned": 0}');
                }
                //responseUtils.notFound(res, toReturn); //Can be used in a brute force attack potentally
                responseUtils.success(res, toReturn);
                return;
            }
            
            //Respond with 200 suceess, and out json object
            responseUtils.success(res, toReturn);

        });

    });
    
}