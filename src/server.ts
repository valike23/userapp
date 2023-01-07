import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
var session = require('express-session');
import {json, urlencoded} from "body-parser";
var MemoryStore = require('memorystore')(session);
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express() // You can also use Express
	.use(
		session({
			// As the session is only used across the life-span of an auth
			// hand-shake, we can use a instance specific random string
			secret: 'safescret',
			resave: false,
			saveUninitialized: false,
			store: new MemoryStore({
			  checkPeriod: 86400000 // prune expired entries every 24h
			})
		  }),
		  urlencoded({ extended: false }),
		  json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT);
