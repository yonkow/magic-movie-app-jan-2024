const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const secret = '9ef54adea72aae48ae01f2115db13ba2dc97b4d3';

exports.register = (userData) => User.create(userData);

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

    const token = await jwt.sing(payload, secret, { expiresIn: '2h' });

    //Send token
    return token;
};
