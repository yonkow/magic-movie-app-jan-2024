const mongoose = require('mongoose');

exports.errorMessage = (err) => {
    let message = '';

        if (err instanceof mongoose.MongooseError) {

            message = Object.values(err.errors).at(0).message;

        } else if (err instanceof Error) {

            message = err.message;
        }
    
    return message;
}