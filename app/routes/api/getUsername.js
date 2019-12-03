/*

Mojang has a limit of one request per min to transform a UUID into a username, or viece versa. So, we are implementing our own cashing database
You pass in a UUID, and it returns you the username

*/


var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {
    
    app.get('/api/getUsername', (req, res) => {

        //?uuid=
        var uuid = req.query.uuid;

        //find the user by the UUID
        database.query("SELECT * FROM `usermap` WHERE uuid = '" + uuid + "'", function (err, result, fields) {
            
            //Database offline or something, not sure why this could happen. Not the best to throw a error
            //try catch and responcseUtils.error ?
            //TODO
            if (err) {
                throw err;
            }
            
            var toReturn = result[0];
            //If the uuid doesn't exist in the database, let them know! WARNING, this might cause errors in the client when parsed as JSON.
            //TODO: Send json error object?
            if(toReturn == undefined) {
                responseUtils.notFound(res, "User not found!");
                return;
            }
            
            //delete the fields we don't need, the database returns both of those but they dont need to be sent for the requests were doing
            delete toReturn.hwid;
            delete toReturn.updated_time;
                
            //respond with 200 OK, and the object. It will be turned into JSON automatically
            responseUtils.success(res, toReturn);

        });
    });
    
}