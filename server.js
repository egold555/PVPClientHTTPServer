const config = require('./config/config');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || config.port;

const passport = require('passport');
const flash = require('connect-flash');

//connect to our database

require('./helpers/passport')(passport); //pass passport for configuration

//set up our express application
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); //set up ejs for templating

//required for passport
app.use(session({
    secret: config.client_secret,
    resave: true,
    saveUninitialized: true,
})); //session secret

app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

app.use('/static', express.static('views/static'));

require('./app/routes.js')(app, passport); //load our routes and pass in our app and fully configured passport

app.listen(port);
console.log("Running Eric's Client Communication Server v" + config.version);
console.log(`The magic happens on port ${port}`);
