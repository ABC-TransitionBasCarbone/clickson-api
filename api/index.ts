import { Express } from 'express'
import express from "express";

const app: Express = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

var options = {
    swaggerOptions: {
        url: "/api-docs/swagger.json",
    },
}
app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerFile));
app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "https://clickson-tau.vercel.app",
        "https://clickson-api-git-develop-abc-transitionbascarbones-projects.vercel.app",
        "https://calculator.clickson.eu"
    ]
}));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
require('./endpoints/auth')(app)
require('./endpoints/emissions')(app)
require('./endpoints/groups')(app)
require('./endpoints/schools')(app)
require('./endpoints/sessions')(app)
require('./endpoints/exports')(app)
require('./endpoints/comments')(app)

export default app;
