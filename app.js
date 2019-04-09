const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const user = require('./routes/user.route')
const character = require('./routes/characters.route');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next()
})

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://HalTheDM:69kq8nesMo4t924W@cluster0-b9mkm.mongodb.net/test?retryWrites=true'
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(dev_db_url).then(()=> {
  console.log("connection success")
}).catch(() => {
  console.log("error")
})
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(upload.array());
app.use(express.static('public'));
app.use('/characters', character);
app.use('/users', user);

let port = 1234;

app.listen(port, () => {
  console.log('Server is up and running on port number' + port);
});
