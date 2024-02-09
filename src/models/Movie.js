const mongoose = require('mongoose');
const maxReleasedYear = new Date().getFullYear() + 5


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Title should be alphanumerical and could includes spaces.'],
        minLength: [5, 'Title is too short'],
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Genre should be alphanumerical and could includes spaces.'],
        minLength: [5, 'Genre is too short'],
    },
    director: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Director should be alphanumerical and could includes spaces.'],
        minLength: [5, 'Director is too short'],
    },
    year: {
        type: Number,
        reqired: true,
        min: [1900, `The year should be between 1900 and ${maxReleasedYear}`],
        max: [maxReleasedYear, `The year should be between 1900 and ${maxReleasedYear}`]
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'The rating should be between 1 and 5'],
        max: [5, 'The rating should be between 1 and 5'],
    },
    description: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Description should be alphanumerical and could includes spaces.'],
        minLength: [20, 'Description is too short'],
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'URL should be in valid format http/https...' ]
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;