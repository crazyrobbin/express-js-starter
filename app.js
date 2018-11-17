var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var Store = require('express-session').Store;
var MongooseStore = require('mongoose-express-session')(Store);
var ejs = require('ejs');
var app = express();

//npm install -g mongoose-model-cli

// MODEL file

require('./models/all-models').toContext(global);

Async = require('async');

//API file 
const user = require('./routes/user');
const api = require('./routes/api');

Response = require('./services/response');
HelperService = require('./services/helperService');


_ = require('lodash');
var Schema = mongoose.Schema;
ObjectId = mongoose.Types.ObjectId;



app.use(require('express-session')({
    secret: 'keyboardsdsacat',
    resave: false,
    rolling: false,
    saveUninitialized: true,
    store: new MongooseStore({
    	connection: require('./models/connection-string'),
    	mongoose: mongoose
        /* configuration */
    })
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Angular 1 app
app.use('/public', express.static(__dirname + '/public/'));



//API location
app.use('/user', user);
app.use('/api', api);

//Set PORT
const port = '4000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));