/*

Handles the "registration" of the routes.

It also connects to the database, and handels logging into the admin page currently. TBD if I should move this

*/

const mysql = require('mysql');
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query(`USE ${dbconfig.database}`);

module.exports = (app, passport) => {

    //"Register" all of our api links
    require('./routes/api/cosmetics.js')(app, passport, connection);
    require('./routes/api/globalSettings.js')(app, passport, connection);
    require('./routes/api/mapUUID.js')(app, passport, connection);
    require('./routes/api/isBanned.js')(app, passport, connection);
    require('./routes/api/isWhitelisted.js')(app, passport, connection);
    require('./routes/api/getUsername.js')(app, passport, connection);
    require('./routes/api.js')(app, passport, connection);
    
    //Home sweet home
    app.get('/', (req, res) => {
        res.render('index.ejs'); // load the index.ejs file
    });
    
    //Admin stuff
    //Move me at some point!
    
    app.get('/admin', (req, res) => {
        res.render('TEMP_ADMIN.ejs'); // load the index.ejs file
    });


    //display login getter page
    app.get('/login', (req, res) => {
        //flash any data to login page
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    //post data for login, passes variables to passport logging in thingy
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', //redirect to the secure profile section
        failureRedirect: '/login', //redirect back to the signup page if there is an error
        failureFlash: true, //flash messages to client
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

    //signup form get request
    app.get('/signup', (req, res) => {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    //post request for data to signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', //redirect to the secure profile section
        failureRedirect: '/signup', //redirect back to the signup page if there is an error
        failureFlash: true, //flash messages to client
    }));

    //admin profile. TO BE CHANGED
    app.get('/profile', isLoggedIn, ({
        user
    }, res) => {
        res.render('admin/profile.ejs', {
            user, //pass user data to client page
        });
    });

    //admin logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

//login middleware
function isLoggedIn(req, res, next) {

    //if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    //if they aren't authenticated, redirect them to the home page
    res.redirect('/');
}
