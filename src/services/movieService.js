const Movie = require('../models/movie');

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

// TODO: Filter result in mongoDB
exports.search = (title, genre, year) => {
    let moviesResult = Movie.find();

    if (title) {
        // moviesResult = moviesResult.filter((movie) =>
        //     movie.title.toLowerCase().includes(title.toLowerCase())
        // );
        moviesResult = moviesResult.find({ title: new RegExp(title, 'i') });
    }

    if (genre) {
        // moviesResult = moviesResult.filter(
        //     (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
        // );
        moviesResult = moviesResult.find({ genre });
    }

    if (year) {
        // moviesResult = moviesResult.filter((movie) => movie.year === year);
        moviesResult = moviesResult.find({ year });
    }

    return moviesResult;
};

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
    // return Movie.findByIdAndUpdate(movieId, {$push: { casts: castId }});

    const movie = await this.getOne(movieId);

    //TODO: vlaidate castId is exists
    //TODO: validate if cast is already added
    movie.casts.push(castId);

    return movie.save();
};
