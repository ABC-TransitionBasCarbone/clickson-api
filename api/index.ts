require('dotenv').config();

import {Express, RequestHandler} from 'express'
import express from "express";

const app:Express = express();
import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://clickson-tau.vercel.app"] }));

app.use("/translations", express.static(__dirname + "/public/translations"));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

/* Endpoints */
require('./endpoints/auth')(app)
require('./endpoints/postgres')(app)
require('./endpoints/translation')(app)

module.exports = app;