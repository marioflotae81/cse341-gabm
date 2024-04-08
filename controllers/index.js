const { client } = require('../db');
const { usersHandler, rolesCheck } = require('../models');


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
        UserRole: 'USER',
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


/**
 * 
 * Check if the user is role "ADMIN"
 */
const isAdmin = async (req, res, next) => {
    const email = req.user._json.email;
    try {
        if (!email) {
            return res.status(404).json({ error: 'Not authorized.' });
        }

        const userInfo = await rolesCheck.getRole(email);
        const role = userInfo.UserRole;
        if (role !== 'ADMIN') {
            return res.status(403).json({ error: 'Permission denied.' });
        }
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
};


/**
 * 
 *  Get the user's Role and NPN  
 */
const getRoleAndNPN = async (req, res, next) => {
    const email = req.user._json.email;

    try {
        if (!email) {
            return res.status(404).json({ error: 'Not authorized.' });
        }

        const userInfo = await rolesCheck.getRole(email);
        const role = userInfo.UserRole;
        const BrokerNPN = userInfo.UserNPN;

        if (!role || !BrokerNPN) {
            return res.status(401).json({ error: 'Unauthorized: User role or BrokerNPN not found.' });
        }

        req.userRole = role;
        req.userBrokerNPN = BrokerNPN;
    
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
};




module.exports = {
    home,
    homeRoute,
    isLoggedIn,
    successRoute,
    googleCallbackRoute,
    logoutRoute,
    failedRoute,
    isAdmin,
    getRoleAndNPN,
}