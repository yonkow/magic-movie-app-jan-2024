const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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