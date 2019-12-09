// load all the things we need
const LocalStrategy = require('passport-local').Strategy;

// load up the user model
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('.././config/database');
const connection = mysql.createConnection(dbconfig.connection);

connection.query(`USE ${dbconfig.database}`);
// expose this function to our app using module.exports
module.exports = (passport) => {

    //passport setup stuff
    // used to serialize the user for the session
    passport.serializeUser(({ id }, done) => {
        done(null, id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        connection.query('SELECT * FROM users WHERE id = ? ', [id], (err, rows) => {
            done(err, rows[0]);
        });
    });

    //local signup
    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true, // allows us to pass back the entire request to the callback
        }, (req, username, password, done) => {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query('SELECT * FROM users WHERE username = ?', [username], (err, { length }) => {
                if (err) return done(err);
                if (length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    const newUserMysql = {
                        username,
                        password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
                    };

                    const insertQuery = 'INSERT INTO users ( username, password ) values (?,?)';

                    connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], (err, { insertId }) => {
                        newUserMysql.id = insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    //local login
    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true, // allows us to pass back the entire request to the callback
        }, (req, username, password, done) => { // callback with email and password from our form
            connection.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
                if (err) return done(err);
                
                //TODO: BRUTE FORCE ATTACK WARNING. SHOULD BE SAME ERROR MESSAGE 'USER NOT FOUND' 'WRONG PASSWORD'
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
