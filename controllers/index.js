const { client } = require('../db');
const { usersHandler } = require('../models');


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

// Save user info at login
const successRoute = async (req, res) => {
    const data = {
        UserEmail: req.user._json.email,
        UserName: req.user._json.name,
        UserPicture: req.user._json.picture,
        UserRole: null,
        UserNPN: null
    };

    try {
        
        const result = await usersHandler.updateUserLogin(data);

        if (result.acknowledged) {
            console.log('You are logged in...')
            return res.status(200).json({ message: `Welcome ${req.user.displayName}` });
        } else {
            return res.status(400).json({ error: `Something went wrong updating the user with email: ${data.UserEmail}` })
        }
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
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