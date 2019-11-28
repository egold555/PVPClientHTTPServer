module.exports = (app, passport, database) => {
    
    app.get('/apitest', (req, res) => {
        res.send("Holy shirtballs it worked");
    });
    
}