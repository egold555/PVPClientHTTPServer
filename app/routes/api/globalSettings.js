var settings = new Object();

settings.hwidWhitelist = false;
settings.latestVersion = "1.0.0";



module.exports = (app, passport, database) => {
    
    app.get('/api/globalSettings', (req, res) => {
        res.send(settings);
    });
    
}