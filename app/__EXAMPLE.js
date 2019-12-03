/*
Given description here about what this request does
*/

var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {
    
    app.get('/apitest', (req, res) => {
        responseUtils.success("Holy shirtballs it worked");
    });
    
}