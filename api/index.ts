require('dotenv').config();

import {Express, RequestHandler} from 'express'
const express = require("express");

const app:Express = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://clickson-tau.vercel.app"] }));

const controllerFunction:RequestHandler = (req, res, next) => {
    
}

/* Endpoints */
require('./endpoints/auth')(app)
require('./endpoints/postgres')(app)
require('./endpoints/translation')(app)

module.exports = app;