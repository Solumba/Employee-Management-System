//creating our express app 
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
//using our env port
const dotenv = require('dotenv');
const connectDB = require('./server/database/connection');
const bodyParser = require('body-parser');

/* setting our config path to our 
config.env file in root directory*/
dotenv.config({path:'config.env'});

/*setting default port to 
8080 if we have no port varaible in our env*/
const runningPort = process.env.PORT || 8080;

//using morgan to log request type to the console
app.use(morgan('tiny'));


//mongoDB connection
connectDB();

//replacing body parser to get body request
app.use(express.urlencoded());

/*setting view engine to ejs which allows us to create 
dynamic html */
app.set('view engine', 'ejs');


  
//for html files
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// //To allow requests from different origins which allows the frontend communicate with the
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

//load routes
app.use('/',require('./server/routes/router'));


app.listen(runningPort, ()=> console.log(`Server is running on http://localhost:${runningPort}`));
