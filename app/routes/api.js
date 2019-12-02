var fs = require('fs');
var responseUtils = require('../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {


    app.get('/api', (req, res) => {
        responseUtils.success(res, '200 OK');
    });

}
