import multer from "multer";

const path = require("path");

//const path = require('path');
const fs = require("fs");
//const multer = require("multer");
//const mongoose = require("mongoose");
//var imageModel = require('../models/imageModel');


// request validation rule before being processed
//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];

///////-----------Headers Response
const supportedMimes = {
  "application/pdf": "pdf",
  "application/zip": "zip",

  "text/csv": "csv",
  "text/pdf": "pdf",
  "text/json": "json",

  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/svg+xml": "svg+xml",
  "image/webp": "webp",

  "video/mp4": "mp4",
  "video/mkv": "mkv",
};

const getFileOptions = () => {
  return {
    storage: multer.diskStorage({
      //destination: (req, file, cb) => cb(null, "app/src-ssr/assets/uploads"),
      destination: "./public/uploads", //directory (folder) setting

      filename: (req, file, cb) => {
        let extension = supportedMimes[file.mimetype];
        let originalname = file.originalname.split(".")[0];
        //`${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        let fileName =
          originalname + "-" + new Date().getMilliseconds() + "." + extension;
        cb(null, fileName);
      },
    }),

    fileFilter: (req, file, cb) => {
      let extension = supportedMimes[file.mimetype];
      if (!extension) {
        return cb(null, false);
      } else {
        cb(null, true);
      }
    },
  };
};

async function extractFileMeta(file){

  var dbName = fs.readFileSync(file.path); //save file_name as buffere
  var encode_dbName = dbName.toString("base64");

  var fileMeta = {
    contentType: file.mimetype,
    mimetype:file.mimetype,
    encoding:file.encoding,
    originalname:file.originalname,
    destination:file.destination,
    fieldname:file.fieldname,
    filename:file.filename,
    //path:file.path,
    size:file.size,
    dbName: new Buffer(encode_dbName, "base64"),
  };

  return fileMeta
}

async function extractFilesMeta(files){

  let filesMeta ={}
  for(let it in files){

  var fieldname = files[it].fieldname
  filesMeta[fieldname]={}
  filesMeta[fieldname+"Meta"]={}

  var newFileName = `${Date.now()}-${Math.round(Math.random() * 1e2)}${path.extname(files[it].originalname)}`; //save file_name as buffere
  var dbName = fs.readFileSync(files[it].path); //save file_name as buffere
  var encode_dbName = dbName.toString("base64");

  var fileMeta = {
    //contentType: files.mimetype,
    mimetype:files[it].mimetype,
    encoding:files[it].encoding,
    originalname:files[it].originalname,
    originalfname:files[it].filename,
    destination:files[it].destination,
    fieldname:files[it].fieldname,
    filename:newFileName,//files[it].filename,
    //path:file.path,
    size:files[it].size,
    dbName: new Buffer(encode_dbName, "base64"),
  };

  filesMeta[fieldname]="/public/uploads/"+fileMeta.originalfname
  filesMeta[fieldname+"Meta"]=fileMeta

  }

  return filesMeta
}

let resHeader = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
  "Set-Cookie": ["type=ninja", "language=javascript"],
};

let setCookies = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
  "Set-Cookie": ["type=ninja", "language=javascript"],
};

// SET STORAGE//Where to save
//Assign the folder where user images should be stored first.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, ".uploads"), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

//build handler //Handle Saving
const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
});



export {handleMultipartData,multer}