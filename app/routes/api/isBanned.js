module.exports = (app, passport, database) => {
    
    app.get('/api/isBanned', (req, res) => {
        //INSERT INTO `clientusers` (`id`, `uuid`, `hwid`, `username`, `updated_time`) VALUES (NULL, 'uuid', 'hwid', 'username', NOW());
        var hwid = req.query.hwid;

        //SELECT * FROM `hwidban` WHERE hwid = 'testhwid'
        database.query("SELECT * FROM `hwidban` WHERE hwid = '" + hwid + "'", function (err, result, fields) {

            if (err) {
                throw err;
            }
            
            var toReturn = result[0];
            //If we don't exist in the database, pretend we do. Just incase.
            if(toReturn == undefined) {
                toReturn = JSON.parse('{"hwid": "' + hwid + '", "isBanned": 0}');
            }
            
            console.log(toReturn);
            res.send(toReturn);

        });

        //res.send("HWID: " + hwid);
    });
    
}