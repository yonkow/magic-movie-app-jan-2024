const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Name should be alphanumerical and could includes spaces.'],
        minLength: [5, 'Name is too short']
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'Age must be between 1 and 120 years.'],
        max: [120, 'Age must be between 1 and 120 years.'],
    },
    born: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Born field should be alphanumerical and could includes spaces.'],
        minLength: [3, 'Born field is too short'],
    },
    nameInMovie: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Name should be alphanumerical and could includes spaces.'],
        minLength: [5, 'Name is too short']
    },
    castImage: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^https?:\/\//.test(value);
            },
            message: (props) => `${props.value} is invalid url for castImage!`
        },
    },
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;
