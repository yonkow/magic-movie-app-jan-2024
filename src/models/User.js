const mongoose = require('mongoose');
const bc = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
});

userSchema.pre('save', async function() {
    const hash = await bc.hash(this.password, 12);
    
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;