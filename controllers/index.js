const { client } = require('../db');

const homeRoute = (req, res) => {
    res.send('Welcome, my friend!')
};

const home = (req, res) => {
    res.send("You're logged out... Bye!");
};


/**
 * 
 * Google OAuth 2.0 Routes
 */
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

const successRoute = (req, res) => {
    res.send(`Welcome ${req.user.displayName}`)
};

const googleCallbackRoute = (req, res) => {
    res.redirect('/success')
};

const logoutRoute = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(`Error while destroying session: ${err}`);
        } else {
            req.logout(() => {
                console.log('You are logged out!');
                res.redirect('/home');
            });
        }
    });
};


const failedRoute = (req, res) => {
    res.send('Failed Authentication');
};


module.exports = {
    home,
    homeRoute,
    isLoggedIn,
    successRoute,
    googleCallbackRoute,
    logoutRoute,
    failedRoute
}