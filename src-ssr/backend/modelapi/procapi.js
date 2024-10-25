//const express = require('express');
import {
  assetModel,
  rawModel,
  supplierModel,
  // maintenModel,
} from "app/src-ssr/backendCore/models/procurmentModels";

import { Router } from "express";
import multer from "multer";

const path = require("path");

import { rOrp,rOp,rOps,dOps } from "app/src-ssr/services/dBServices/documentRead.js";//
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js";//

import { _filesMeta} from "../../services/fileServices/fileMetas.js" 
import { _fileMeta} from "../../services/fileServices/fileMetas.js" //_thefilePath
// import compression from "compression";

//require('dotenv').config()
//const dotenv = require('dotenv');
//dotenv.config();

const router = Router();

const fs = require("fs");

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];

import { createasset,updateasset } from "app/src-ssr/services/modalServices/assetServices.js";
const modelI = assetModel
const modelIName = "/asset"

import { createraw,updateraw } from "app/src-ssr/services/modalServices/rawServices.js";
const modelII = rawModel
const modelIIName = "/rawmaterial"

import { createsupplier,updatesupplier } from "app/src-ssr/services/modalServices/supplierServices.js";
const modelIII = supplierModel
const modelIIIName = "/supplier"


let _setResponseHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5000",
  ETag: "Roaw",
};

///////-----------Headers modelData
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
  //////console.log('request with UploadFile_Detected - FileUptions -Multer Happening')
  var _fileName =  ""
  var _originalName=  ""
  var _fieldName = ""

  return {
    storage: multer.diskStorage({

      filename: (req, file, cb) => {
        
        let extension = supportedMimes[file.mimetype];
        _originalName = file.originalname.split(".")[0];
        //`${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        _fileName =_originalName.split(" ")[0] + "-" + new Date().getTime() + "." + extension;
        _fieldName =file.fieldname

        cb(null, _fileName);
      },
      //path: "/"+ _fieldName + _fileName,
      destination: (req, file, cb) => {cb(null, "./public/"+ file.fieldname)},
      path:        (req, file, cb) => {cb(null, "/"+file.fieldname +"/"+_fileName)},
      //destination: "./public/"+_fieldName, //directory (folder) setting
      //--------additional meta(drived)
      timestamp:new Date()
    }),
    limits: { fileSize: 1000000 * 5 },
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
  if(file){
    let fileMeta ={}
    try{
      var dbName = fs.readFileSync(file.path); //save file_name as buffere
      var encode_dbName = dbName.toString("base64");
      var _thefilePath = "/"+file.fieldname+"/"+file.filename
  
      fileMeta = {
        contentType: file.mimetype,
        mimetype:file.mimetype,
        encoding:file.encoding,
        originalname:file.originalname,
        destination:file.destination,
        fieldname:file.fieldname,
        filename:file.filename,
        path:file.path,
        size:file.size,
        //----------
        thefilePath:_thefilePath,
        dbName: encode_dbName,
        geoLocation:"0000000000xyz"
      };
    }catch{ }
    return fileMeta

  }
  else{
    return ""
  }
  
}

// SET STORAGE//Where to save

//---------AssetModel------------------END
//====================  CREATING   ========================
router.post(modelIName, async (req, res) => {
  //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P +token) Received." });    
  }
  //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
  let reqParams = req.query ?? (req.params ?? {})
  //-------------------------- is there form_Data
  var file_ = (reqParams?.['file_'] ?? false)
  //-------------------------- 
  let reqData= {};
  //-----------Extracting Request_Body & Validate
  reqData= req.body ?? {};
  if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
  //------------
  reqData['userId']=userId
  //----------------
  return await createasset(reqData,reqData['onplayOps'] ?? 'CreateRowItem').then((modelData)=>{
    console.log(modelData,'ASSET')
    res.set(_setResponseHeader)
    return res.status(modelData.status).send(modelData.data);                 
  })
});

router.put(modelIName, async (req, res) => {

      //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
      let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
      if(!userId){ 
        //return res.status(401).send({ message: "NullData(P +token) Received." });    
      }
      //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
      let reqParams = req.query ?? (req.params ?? {})
      //-------------------------- is there form_Data
      var file_ = (reqParams?.['file_'] ?? false)
      //-------------------------- 
      let reqData= {};

      //-----------Extracting Request_Body & Validate
      reqData= req.body ?? {};
      if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
      //------------
      reqData['userId']=userId
      return await updateasset(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
        res.set(_setResponseHeader)
        return res.status(modelData.status).send(modelData.data);                 
      })
});

// Get all products
router.get(modelIName+"s", async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  let reqParams = req.query ?? (req.params ?? {})
  if (Object.keys(reqParams).length == 0) {
    // return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=0] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //-----------
  console.log(reqParams,'ppppppppp');
  try {
    let modelData =( reqParams['and'] ?? false) ? //queries Combinations ( ored or anded)
          await rOps(modelI, findBy, returnWat, limits,sortBy):
          await rOrp(modelI, findBy, returnWat, limits,sortBy)
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error); }
});

// Get a single product by ID                           
router.get(modelIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  console.log('requestparams==========',req.query ?? (req.params ?? {}))

  let reqParams = req.query ?? (req.params ?? {})
  console.log(reqParams,'requestparams==========',(Object.keys(reqParams).length == 0))
  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=0] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //-----------
  try {
    let modelData =( reqParams['and'] ?? false) ? //queries Combinations ( ored or anded)
          await rOp(modelI, findBy, returnWat, limits,sortBy):
          await rOrp(modelI, findBy, returnWat, limits,sortBy)
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error); }
});
//---------------------------------------
//let delKey = "_id";
router.delete(modelIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  let reqParams = req.query ?? (req.params ?? {})
  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Search Query is null ?");
  }else{}

  try {
    let modelData = await dOps(modelI, reqParams["id"]); //send Id_value only
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error);}
});

//---------AssetModel------------------END

//---------rawmaterialModel------------------END

//====================  CREATING   ========================

//====================  CREATING   ========================
router.post(modelIIName, async (req, res) => {
  //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P +token) Received." });    
  }
  //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
  let reqParams = req.query ?? (req.params ?? {})
  //-------------------------- is there form_Data
  var file_ = (reqParams?.['file_'] ?? false)
  //-------------------------- 
  let reqData= {};

  //-----------Extracting Request_Body & Validate
  reqData= req.body ?? {};
  if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
  //------------
  reqData['userId']=userId
  //----------------
  return await createraw(reqData,reqData['onplayOps'] ?? 'CreateRowItem').then((modelData)=>{
    res.set(_setResponseHeader)
    return res.status(modelData.status).send(modelData.data);                 
  })
});

router.put(modelIIName, async (req, res) => {

      //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
      let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
      if(!userId){ 
        //return res.status(401).send({ message: "NullData(P +token) Received." });    
      }
      //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
      let reqParams = req.query ?? (req.params ?? {})
      //-------------------------- is there form_Data
      var file_ = (reqParams?.['file_'] ?? false)
      //-------------------------- 
      let reqData= {};

      //-----------Extracting Request_Body & Validate
      reqData= req.body ?? {};
      if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
      //------------
      reqData['userId']=userId
      return await updateraw(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
        res.set(_setResponseHeader)
        return res.status(modelData.status).send(modelData.data);                 
      })
});

// Get all products
router.get(modelIIName+"s", async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  let reqParams = req.query ?? (req.params ?? {})
  if (Object.keys(reqParams).length == 0) {
    // return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=0] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //-----------
  try {
    let modelData =( reqParams['and'] ?? false) ? //queries Combinations ( ored or anded)
          await rOps(modelII, findBy, returnWat, limits,sortBy):
          await rOrp(modelII, findBy, returnWat, limits,sortBy)
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error); }
});

// Get a single product by ID                           
router.get(modelIIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  console.log('requestparams==========',req.query ?? (req.params ?? {}))

  let reqParams = req.query ?? (req.params ?? {})
  console.log(reqParams,'requestparams==========',(Object.keys(reqParams).length == 0))
  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=0] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //-----------
  try {
    let modelData =( reqParams['and'] ?? false) ? //queries Combinations ( ored or anded)
          await rOp(modelII, findBy, returnWat, limits,sortBy):
          await rOrp(modelII, findBy, returnWat, limits,sortBy)
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error); }
});
//---------------------------------------
//let delKey = "_id";
router.delete(modelIIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  let reqParams = req.query ?? (req.params ?? {})
  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Search Query is null ?");
  }else{}

  try {
    let modelData = await dOps(modelII, reqParams["id"]); //send Id_value only
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error);}
});

//---------supplierModel------------------END

//----------raw------------------END
//---------supplierModel------------------Begin
//====================  CREATING   ========================


router.post(modelIIIName, async (req, res) => {
  //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P +token) Received." });    
  }
  //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
  let reqParams = req.query ?? (req.params ?? {})
  //-------------------------- is there form_Data
  var file_ = (reqParams?.['file_'] ?? false)
  //-------------------------- 
  let reqData= {};

  //-----------Extracting Request_Body & Validate
  reqData= req.body ?? {};
  if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
  //------------
  reqData['userId']=userId
  //----------------
  return await createsupplier(reqData,reqData['onplayOps'] ?? 'CreateRowItem').then((modelData)=>{
    res.set(_setResponseHeader)
    return res.status(modelData.status).send(modelData.data);                 
  })
});

router.put(modelIIIName, async (req, res) => {

      //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
      let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
      if(!userId){ 
        //return res.status(401).send({ message: "NullData(P +token) Received." });    
      }
      //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
      let reqParams = req.query ?? (req.params ?? {})
      //-------------------------- is there form_Data
      var file_ = (reqParams?.['file_'] ?? false)
      //-------------------------- 
      let reqData= {};

      //-----------Extracting Request_Body & Validate
      reqData= req.body ?? {};
      if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
      //------------
      reqData['userId']=userId
      return await updatesupplier(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
        res.set(_setResponseHeader)
        return res.status(modelData.status).send(modelData.data);                 
      })
});

// Get all products
router.get(modelIIIName+"s", async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  let reqParams = req.query ?? (req.params ?? {})
  if (Object.keys(reqParams).length == 0) {
    // return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=0] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //-----------
  try {
    let modelData =( reqParams['and'] ?? false) ? //queries Combinations ( ored or anded)
          await rOps(modelIII, findBy, returnWat, limits,sortBy):
          await rOrp(modelIII, findBy, returnWat, limits,sortBy)
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error); }
});

// Get a single product by ID                           
router.get(modelIIIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  console.log('requestparams==========',req.query ?? (req.params ?? {}))

  let reqParams = req.query ?? (req.params ?? {})
  console.log(reqParams,'requestparams==========',(Object.keys(reqParams).length == 0))
  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=0] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //-----------
  try {
    let modelData =( reqParams['and'] ?? false) ? //queries Combinations ( ored or anded)
          await rOp(modelIII, findBy, returnWat, limits,sortBy):
          await rOrp(modelIII, findBy, returnWat, limits,sortBy)
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error); }
});
//---------------------------------------
//let delKey = "_id";
router.delete(modelIIIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //--------------------
  let reqParams = req.query ?? (req.params ?? {})
  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Search Query is null ?");
  }else{}

  try {
    let modelData = await dOps(modelIII, reqParams["id"]); //send Id_value only
    res.set(_setResponseHeader)
    return res.status(modelData.status).json(modelData['data']);
  } catch (error) {return res.status(500).send(error);}
});

//---------MaintenanceModel------------------begin

//====================  CREATING   ========================

//---------modelIv------------------END

//---------MaintenaceModel------------------END

//-------------------------------parametries Quering (Query Builder)

//----------------------------------Query Builder
// API
export default router



  //if filtering findBy != {}...
  // { $or: [   { age: 28 }, { age: 1 } ],... }........instead of findBy { key:value,key:value }
  // { age: {{ $in:[ 28, 1] },  },... }........instead of findBy { key:value,key:value }
  //if filtering findBy != {}...
  // { $or: [   { age: 28 }, { age: 1 } ],... }........instead of findBy { key:value,key:value }
  // { age: {{ $in:[ 28, 1] },  },... }........instead of findBy { key:value,key:value }
