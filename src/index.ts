import 'reflect-metadata';
import 'module-alias/register';
import express from 'express';
import * as bodyParser from 'body-parser';
import Container from 'typedi';
import { ENV_CONFIG } from '../config';
import { useExpressServer, useContainer as routingContainer } from 'routing-controllers';
import * as http from 'http';
import { ccAccountsRouter } from "./router/creditCard.router";
import cors from 'cors';
import { uploadFileRouter } from './router/uploadFile.router';
import { captcha } from './router/captcha.router';


const baseDir = __dirname;
const expressApp = express();

// Handling the DependencyInjection across the entire application
routingContainer(Container);

// Loads all the Controllers from the directories and provides the routing facility
useExpressServer(expressApp, {
  routePrefix: ENV_CONFIG.app.apiRoot,
  defaultErrorHandler: false,
  controllers: [baseDir + `/**/controllers/*{.js,.ts}`]
});

expressApp.use(express.json({ limit: '200mb' }));

expressApp.use(cors());
expressApp.use("/creditCards", ccAccountsRouter);
expressApp.use("/captcha", captcha);
expressApp.use("/upload", uploadFileRouter);

const server = http.createServer(expressApp);
server.listen(ENV_CONFIG.app.port, () => {
  console.log(`'Server', 'Application running on', ${ENV_CONFIG.app.hostname}:${ENV_CONFIG.app.port}`);
});

// Handling the unHandledRejection errors
process.on('unhandledRejection', (error, promise) => {
  console.log(`'Server', 'unhandledRejectionError :', ${error}`);
});