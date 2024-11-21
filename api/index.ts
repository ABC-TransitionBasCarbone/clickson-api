import { Express } from 'express'
import express from "express";

const app: Express = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:8080", "https://clickson-tau.vercel.app", "https://clickson-api-git-develop-abc-transitionbascarbones-projects.vercel.app"] }));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("/countries", express.static(__dirname + "/public/countries/countries.json"));
require('./endpoints/auth')(app)
require('./endpoints/emissions')(app)
require('./endpoints/groups')(app)
require('./endpoints/schools')(app)
require('./endpoints/sessions')(app)
require('./endpoints/exports')(app)
require('./endpoints/languages')(app)

export default app;
