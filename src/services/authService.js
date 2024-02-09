const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    const user = await User.findOne({email: userData.email});

    if (user) {
        throw new Error('User with this email is already exist.')
    }

    return User.create(userData)
};

exports.login = async (email, password) => {
    //get user from DB
    const user = await User.findOne({ email });

    //Check if user exists
    if (!user) {
        throw new Error("The email or password doesn't exist.");
    }

    //Check if the password is valid

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error("The email or password doesn't exist.");
    }

    //Generate jwt
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sing(payload, SECRET, { expiresIn: '2h' });

    //Send token
    return token;
};

