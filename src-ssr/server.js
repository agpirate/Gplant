/**
 * More info about this file:
 * https://v2.quasar.dev/quasar-cli-vite/developing-ssr/ssr-webserver
 *
 * Runs in Node context.
 */

/**
 * Make sure to yarn add / npm install (in your project root)
 * anything you import here (except for express and compression).
 */
import express from "express";
import compression from "compression";
// import compression from "compression"
import cookieParser from "cookie-parser"
import bodyParser  from "body-parser"
import cors from "cors"

import {
  ssrClose,
  ssrCreate,
  ssrListen,
  ssrRenderPreloadTag,
  ssrServeStaticContent,
} from "quasar/wrappers";
//import { planner } from "app/src-ssr/services/planner";
//const upload = import("./backend/apiservices/upload");
//import { finDBs,humdDBs,procDBs,saleDBs,adminDBs} from "./backendCore/dbConns" // just import them for auto_firing(dur they are const_variables) or use the module.export
// const { empyModel } = import("./backendCore/models/profileModels.js");

//1) Home & token authentication
import tokenApi from './backend/profileapi/tokenApi.js'
import rolePermissionApi from './backend/profileapi//permissionApi.js'

// const serviceapi = import("./backend/profileapi/profileapi");
import serviceapi from "./backend/serviceapi/serviceapi";
import profileapi from "./backend/profileapi/profileapi";
// const profileMetaapi = import("./backend/profileapi/profileMetaapi");
//-------------
import procapi from "./backend/modelapi/procapi"
import  saleapi  from "./backend/modelapi/saleapi"
import finapi  from "./backend/modelapi/finapi"

//import { accComputing } from "./services/accessComputing";
//-----------------

// const bodyParser = require("body-parser");
//const path = require('path');
const fs = require("fs");
const multer = require("multer");
//const mongoose = require("mongoose");
//var imageModel = require('../models/imageModel');

//-------------------------------------------------
//is used to parse request.body datas to be visible as json form when..thier are requesting as json_content_type
// create application/json parser ///// none global parsing usage
//var jsonParser = bodyParser.json(); // or we can use this on each request_paths
//import fs from "fs";
//import path from "path";
// create application/x-www-form-urlencoded parser //// non global parsing usage
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

//-----------

const nul = [null, undefined, false, "", [], {},NaN];


let doNotCache={"Cache-Control": "no-cache"}
let cacheIndefinitely={"Cache-Control":"public, max-age=31557600"}
let cacheForOneDay={"Cache-Control":"public, max-age=86400"}

///////-----------Headers Response
//Session Configuration
import dotenv from "dotenv" //enale external (.env file on top )
dotenv.config();
console.log(process.env.me ?? 'menn-xxx',process.env.serviceBAPI_ ?? 'apiport -xx','vvvari')

async function computeSession(key){

  const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
  };
  return session
}

let resHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "50000000000",
  'ETag': "Roaw",
  "Set-Cookie": 'Httponly;SameSite=Strict;',
  "Access-Control-Allow-Credentials": "true",
  'cookie' : "witcher=Geralt; SameSite=Strict;",
  'aaaa':'aaaa'
};

let staticHeader = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "123",
  yrgrequest: "12345",
  "Set-Cookie": ["type=ninja", "language=javascript","SameSite=None",],
  "SameSite": "None",
  cacheForOneDay,
};

//if (app.get("env") === "production") {
// Serve secure cookies, requires HTTPS
//  session.cookie.secure = true;
//}

//================================================Defined...
/**
 * Create your webserver and return its instance.
 * If needed, prepare your webserver to receive
 * connect-like middlewares.
 *
 * Should NOT be async!
 */
export const create = ssrCreate((/* { ... } */) => {
  const app = express();

  // useing for csrf possiblity
  if(cors){  
    app.use(cors());
   };

  // attackers can use this header to detect apps running Express
  // and then launch specifically-targeted attacks
  app.disable("x-powered-by");
  //--------------------------------------------Definde
  /*
    npm install -g express-generator
    npx express --view=ejs

    npm install

    npm install body-parser --save
    npm install express multer --save
    npm install mongoose
*/
  /*
Node.js request body parsing middleware which parses the incoming request body 
before your handlers, and make it available under req.body property. 
In other words, it simplifies the incoming request.
*/
// place here any middlewares that
// absolutely need to run before anything else
if (process.env.PROD) { app.use(compression());  }
  //------------------------------------------setting headers as middleware for each response
// Middleware to parse cookies
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(bodyParser.json());
//-------------------------serving statics
app.use(bodyParser.urlencoded({ extended: true }));

  /*Multer is a node.js middleware for handling multipart/form-data , 
  which is primarily used for uploading files. 
  It is written on top of busboy for maximum efficiency.

  */

  //---------------serving statics
// Serving static files from 'public' directory
//app.use(express.static("public")); //server static of public_folder on hardcoded_path as ip:port/public [this way is vulnerable for accessing other project folders..use virtual path]
app.use(express.static('public')); 
//enables to access--childs of public_folder..using_appending </> or </public> to ( foldername/file or file)_ inside
app.use("virtualPath",express.static('public')); //or you can use alias_name for the </> or </public>_appending ( /virtualPath/foldername/file or justFile)
//this way it will serve every file inside public_folder (even with no proper_path_of_folder)

// Serving static files from 'public' directory at a virtual path '/static'
app.use('/static', express.static('public'));//server static of pulic folder on virtual url_ of ip:port/static

app.use("/css", express.static(__dirname+"public/css"));
app.use("/img", express.static(__dirname+"public/img"));
app.use("/js", express.static(__dirname+"public/js"));

// Serving static files with cache control
app.use('/public',express.static('public', {
  maxAge: '1d', /* Cache for 1 day,*/
  etag: true, /* Enable ETag headers..helps in efficient cache validation */
 index: false /*By default, Express does not list directory contents, but it's important to ensure that this feature remains
 disabled to prevent information disclosure.*/
}));/* Optimizing the delivery of static files is crucial for performance. Express allows setting cache control
 headers to improve load times and reduce server load.    */
 const compression = require('compression');
 app.use(compression());/*Using compression middleware can reduce the size of the response body, thereby increasing 
 the speed of a web application. */


//and serve static files from 'assets' directory tooo
app.use("assets",express.static('src/assets'));//
//enables to access--childs of assets_folder..using_appending </> or </assets> to ( foldername/file or file)_ inside
app.use("virtualPath",express.static('public')); //or you can use alias_name for the </> or </assets>_appending ( /virtualPath/foldername/file or justFile)





  app.use((req, res, next) => { //every request goes through here
    // Set common headers for all responses
    res.setHeader('X-Powered-By', 'YitService');
    res.setHeader("Content-Type", "application/json" ); //file MIMP type acceptable for response over  body
    // res.setHeader('Content-Type', 'text/x-sass'); //file MIMP type acceptable for response over  body
    //Accept: text/plain //Content-Types that are acceptable for the response
    
    //res.setHeader('Access-Control-Allow-Origin', '*') //Specifying which web sites can participate in cross-origin resource sharing

    // Set security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN'); //Clickjacking protection:
    res.setHeader('X-XSS-Protection', '1; mode=block'); //Cross-site scripting (XSS) filter
    
    // Prevent browser caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); //Tells all caching mechanisms from server to client whether they may cache this object. It is measured in seconds
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '4d');

    // Call the next middleware
    next();
    return true
});
    //----------------------------------Live Setup
   //const server = http.createServer(app);
   //const wss = new WebSocket.Server({ server });

   // wss.on('connection', function connection(ws) {
      //console.log('Client connected');
      // Handle messages from clients
   //   ws.on('message', function incoming(message={}) {
          //console.log('Received: %s', message);
   //   });
   // });
  //------------------------------------------

  //====================  AUTHENTICATING + Schematic ========================
  //UserAuthenticating...
  

  //====================  Profile & metaProfile api  ======================== giveMe  one/all....matched?
  app.use('/api', tokenApi); //routes to be run on first to check for user token(authorization)
  app.use('/permission', rolePermissionApi); //routes to be run on first to check for user token(authorization)

  // app.use("/chat", profileMetaapi); //referess.... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  app.use("/services", serviceapi); //referess.... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  app.use("/profileapi", profileapi); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model

  //-------------[[[[[[[[[[[[[[[[[ DATA api ROUTRS ]]]]]]]]]]]]]]]]]]] ataapi api-controller-services-mongoosing(CRUD)

  app.use("/finance", finapi); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  //app.use("/humdcrud", humdapi); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  app.use("/procurment", procapi); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  app.use("/sale", saleapi); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  //===================================================================================DEFINDE API
  return app;
});

/**
 * You need to make the server listen to the indicated port
 * and return the listening instance or whatever you need to
 * close the server with.
 *
 * The "listenResult" param for the "close()" definition below
 * is what you return here.
 *
 * For production, you can instead export your
 * handler for serverless use or whatever else fits your needs.
 */



export const listen = ssrListen(async ({ app, port, isReady }) => {
  await isReady();
  return app.listen(process.env.API_PORT, () => {
    if (process.env.PROD) {
     console.log('Server listening at port ' + process.env.API_PORT)
    }else{
     console.log('Dev Server listening at port ' + process.env.API_PORT)

    }

  });
});

/**
 * Should close the server and free up any resources.
 * Will be used on development only when the server needs
 * to be rebooted.
 *
 * Should you need the result of the "listen()" call above,
 * you can use the "listenResult" param.
 *
 * Can be async.
 */
export const close = ssrClose(({ listenResult }) => {
  return listenResult.close();
});

const maxAge = process.env.DEV ? 0 : 1000 * 60 * 60 * 24 * 30;

/**
 * Should return middleware that serves the indicated path
 * with static content.
 */
export const serveStaticContent = ssrServeStaticContent((path, opts) => {
  return express.static(path, {
    maxAge,
    ...opts,
  });
});

const jsRE = /\.js$/;
const cssRE = /\.css$/;
const woffRE = /\.woff$/;
const woff2RE = /\.woff2$/;
const gifRE = /\.gif$/;
const jpgRE = /\.jpe?g$/;
const pngRE = /\.png$/;

/**
 * Should return a String with HTML output
 * (if any) for preloading indicated file
 */
export const renderPreloadTag = ssrRenderPreloadTag((file) => {
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }

  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}">`;
  }

  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }

  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }

  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`;
  }

  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  }

  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`;
  }

  return "";
});
//======================================Utilies Services

//-------------------------------parametries Quering (Query Builder)
async function _postputParams(reqParams = {}) {
  if (Object.keys(reqParams).length === 0) {
    return [false];
  }
  let returnWat = {};
  let limits = 100;
  try {
    if (reqParams["returnWat"]) {
      returnWat = reqParams["returnWat"];
      delete reqParams["returnWat"];
    }
  } catch {}
  try {
    if (reqParams["limits"]) {
      limits = reqParams["limits"];
      delete reqParams["limits"];
    }
  } catch {}

  try{
    delete reqParams["upload"];
    delete reqParams["timestamp"];
  }catch{}

  //.... doing data manipulating for mongoodb
  let findBy = Object.keys(reqParams).length
    ? await _queryParams(reqParams)
    : [{}];

  return [findBy, returnWat, limits];
}

async function _queryParams(params = {},isget=0) {

  try {
    parseQuery = JSON.parse(params);
  } catch {
    parseQuery = params;
  }

  let theQuery = []; //the last query is return_filter & the other is filter
  //$or: [   { age: 28 }, { age: 1 } ]
  for (let paramKey in parseQuery) {
    //it(param)
    let obj = {};
    let keyTranslating = paramKey;
    if (["id", "Id", "ID"].includes(keyTranslating)) {
      keyTranslating = "_id";
    } //if param_key ..is id ( it'would reassing into _id(which mongoose use_ to identifie_id(column))
    if(isget && typeof parseQuery[paramKey] !== 'object' ){
      obj[keyTranslating] = {$regex : parseQuery[paramKey].toString(), "$options": "i" }

    }else{
    obj[keyTranslating] = parseQuery[paramKey]; //if  param_key != id , use as it's.... & resolve the incoming :key:value
    }
theQuery.push(obj);
  }
  if (!theQuery.length) {
    theQuery = [{}];
  } else {
    theQuery = theQuery.filter(
      (obj) => !(obj && Object.keys(obj).length === 0)
    );
  }
  ////console.log("Quering Parsing Service..", theQuery);
  return theQuery;
}

//----------------------------------Query Builder
// API
//----------------------------------Query Builder

/*
var upload = muler({
  storage: muler.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.img + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

*/
