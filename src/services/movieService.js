const Movie = require('../models/movie')

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId);

// TODO: Filter result in mongoDB
exports.search = (title, genre, year) => {
    let moviesResult = Movie.find();

    if(title) {
        moviesResult = moviesResult.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    };

    if(genre) {
        moviesResult = moviesResult.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    };

    if(year) {
        moviesResult = moviesResult.filter(movie => movie.year === year);
    };

    return moviesResult;
}

exports.create = (movieData) => Movie.create(movieData);
