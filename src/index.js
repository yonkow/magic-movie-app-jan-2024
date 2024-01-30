const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const app = express();
const port = 5000;

configHandlebars(app);
configExpress(app);

app.use(routes);

mongoose.connect(`mongodb://127.0.0.1:27017/magic-movies`).then(() => {
    console.log(`DB Connected`);

    app.listen(port, () => {console.log(`Server is listening on: http://localhost:${port}...`);});
    })
    .catch(err => console.log('Cannot coonnect to DB'));