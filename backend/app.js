const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// importing routes from the routes folder
const routes = require('./routes');

// checks to see what the value the key of environment exported out of config/index
const { environment } = require('./config');
// if the environment is in production and returns true, this will kick in some security middleware below 
const isProduction = environment === 'production'

//init the Express app
const app = express();

//connecting morgan to log info about requests and responses
app.use(morgan('dev'));

//for parsing cookies, surprise
app.use(cookieParser());

//for parsing bodies with the content type 'application/json'
app.use(express.json());


// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
    );

  // Connect all the routes
  app.use(routes); 
    
  module.exports = app;
