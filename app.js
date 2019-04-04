const express = require('express');
const bodyParser = require('body-parser');

const character = require('./routes/characters.route');
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://HalTheDM:69kq8nesMo4t924W.cluster0-shard-00-00-b9mkm.mongodb.netcluster0-shard-00-00-b9mkm.mongodb.net:27017'
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/characters', character)

let port = 1234;

app.listen(port, () => {
  console.log('Server is up and running on port number' + port);
});
