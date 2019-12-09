/*

Given a HWID, returns if they are whitelisted or not.

Example json returned:

{
  "hwid": "hwid-passed-in",
  "isWhitelisted": 1
}

*/

var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {
    
    //GET
    app.get('/api/isWhitelisted', (req, res) => {
        
        //?hwid=
        var hwid = req.query.hwid;

        //Query the database for the hwid
        database.query("SELECT * FROM `hwidwhitelist` WHERE hwid = '" + hwid + "'", function (err, result, fields) {
            
            //Not sure when a error would occurr
            //Best to echo it as JSON
            //TODO: Fix server crash here
            if (err) {
                throw err;
            }
            
            var toReturn = result[0];
            //If we don't exist in the database, pretend we do. Just incase. Rules out the case of brute forcing hwid's
            if(toReturn == undefined) {
                //Incase they try to crash our server by escaping JSON. There should be a better way of doing this
                try {
                    toReturn = JSON.parse('{"hwid": "' + hwid + '", "isWhitelisted": 0}');
                }
                catch(e){
                    toReturn = JSON.parse('{"hwid": "undefined", "isWhitelisted": 0}');
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