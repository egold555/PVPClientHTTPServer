/*

You can put something here if you want, but I figured something just telling the user the site is up is good enough.
You might want to make this display a more helpful message depending on if your api is public or not o_0
*/

var fs = require('fs');
var responseUtils = require('../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {


    app.get('/api', (req, res) => {
        //respond with 200 OK and the text "200 OK"
        responseUtils.success(res, '200 OK');
    });

}
