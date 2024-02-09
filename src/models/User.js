const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Email should be valid.'],
        minLength: [10, 'Email should be at least 10 characters long'],
    }, 
    password: {
        type: String,
        require: true,
        match: [/\w+/, 'Password should consist only of English letters and digits'],
        minLength: [6, 'Password should be at least 6 characters long'],
    },
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 12);
    
    this.password = hash;
});

userSchema.virtual('rePassword')
    .set(function(value) {
        if(value !== this.password) {
            throw new mongoose.MongooseError('Password missmatch!')
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;