var clientGlobalSettings = require("../../.././config/config").clientSettings;

module.exports = (app, passport, database) => {
    
    app.get('/api/globalSettings', (req, res) => {
        res.send(clientGlobalSettings);
    });
    
}