import {Express} from 'express'
import express from "express";

const app:Express = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

import auth from './endpoints/auth';
import postgres from './endpoints/postgres';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://clickson-tau.vercel.app"] }));

app.use("/translations", express.static(__dirname + "/public/translations"));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

/* Endpoints */
require('./endpoints/auth')(app)
require('./endpoints/postgres')(app)
require('./endpoints/translation')(app)
require('./endpoints/exports')(app)

export default app;