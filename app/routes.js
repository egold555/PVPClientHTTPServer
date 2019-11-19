// app/routes.js

const mysql = require('mysql');
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query(`USE ${dbconfig.database}`);

module.exports = (app, passport) => {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', (req, res) => {
        res.render('index.ejs'); // load the index.ejs file
    });
    
    //MYSQL INJECTION FIX: https://www.veracode.com/blog/secure-development/how-prevent-sql-injection-nodejs

    //API ==============================================================================================
    app.get('/api', (req, res) => {
        res.render('api.ejs'); // load the index.ejs file

    });

    app.post('/api/mapUUID', (req, res) => {
        //INSERT INTO `clientusers` (`id`, `uuid`, `hwid`, `username`, `updated_time`) VALUES (NULL, 'uuid', 'hwid', 'username', NOW());
        var uuid = req.body.uuid;
        var hwid = req.body.hwid;
        var username = req.body.username;

        connection.query("REPLACE INTO usermap(uuid, hwid, username) VALUES('" + uuid + "', '" + hwid + "', '" + username + "')", function (err, result, fields) {

            if (err) {
                throw err;
            }

            console.log(result);
            res.send(result);

        });

        console.log(uuid + " " + hwid + " " + username);
    });

    app.get('/api/isBanned', (req, res) => {
        //INSERT INTO `clientusers` (`id`, `uuid`, `hwid`, `username`, `updated_time`) VALUES (NULL, 'uuid', 'hwid', 'username', NOW());
        var hwid = req.body.hwid;

        //SELECT * FROM `hwidban` WHERE hwid = 'testhwid'
        connection.query("SELECT * FROM `hwidban` WHERE hwid = '" + hwid + "'", function (err, result, fields) {

            if (err) {
                throw err;
            }

            console.log(result);
            res.send(result);

        });

        //res.send("HWID: " + hwid);
    });

    //end api =============================================================================================

    app.get('/mysql', (req, res) => {

        connection.query("SELECT * from cosmetics", function (err, result, fields) {

            if (err) {
                throw err;
            }

            console.log(result);
            var result2 = JSON.stringify(result);
            res.render('test/mysql_users.ejs', {
                result,
                result2
            }); // load the index.ejs file

        });
    });

    app.get('/admin', (req, res) => {
        res.render('TEMP_ADMIN.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true, // allow flash messages
    }), ({
        body,
        session
    }, res) => {
        console.log('hello');

        if (body.remember) {
            session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            session.cookie.expires = false;
        }
        res.redirect('/');
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', (req, res) => {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true, // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, ({
        user
    }, res) => {
        res.render('admin/profile.ejs', {
            user, // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
