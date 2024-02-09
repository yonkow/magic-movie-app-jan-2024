const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/\w.+/, 'Name should be alphanumerical and could includes spaces.'],
        minLength: [5, 'Name is too short']
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120,
    },
    born: {
        type: String,
        required: true,
        match: [/\w.+/, 'Born field should be alphanumerical and could includes spaces.'],
        minLength: [3, 'Born field is too short'],
    },
    nameInMovie: {
        type: String,
        required: true,
        match: [/\w.+/, 'Name should be alphanumerical and could includes spaces.'],
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
