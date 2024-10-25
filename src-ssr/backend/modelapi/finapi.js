//const express = require('express');
import {
  statmentModel,
  monpayModel,
  mispayModel,
} from "app/src-ssr/backendCore/models/financeModels";

import { Router } from "express";
import multer from "multer";

import { rOrp,rOp,rOps,dOps } from "app/src-ssr/services/dBServices/documentRead.js";//
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js";//

// import { statments } from "app/src-ssr/services/expenseService";
// import {createStatment,updateStatment} from "@@/services/statmnetServices"
const path = require("path");

import compression from "compression";

//require('dotenv').config()
//const dotenv = require('dotenv');
//dotenv.config();

const router = Router();

const fs = require("fs");

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];

import { createStatment,updateStatment } from "app/src-ssr/services/modalServices/statmentServices";
const modelI = statmentModel
const modelIName = "/statment"

import { createmonpay,updatemonpay } from "app/src-ssr/services/modalServices/monpayServices";
const modelII = monpayModel
const modelIIName = "/monpay"

import { createmispay,updatemispay } from "app/src-ssr/services/modalServices/mispayServices";
var modelIII = mispayModel
var modelIIIName = "/mispay"

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
  ////console.log('request with UploadFile_Detected - FileUptions -Multer Happening')
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
  let fileMeta ={}
  try{
    var dbName = fs.readFileSync(file.path); //save file_name as buffere
    var encode_dbName = dbName.toString("base64");
  
    fileMeta = {
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
  }catch{ }
 
  ////console.log('request with UploadFile_Detected[file]',fileMeta)

  return fileMeta
}

async function extractFilesMeta(files){

  let filesMeta ={}
  for(let it in files){

    try{
      var file = files[it]
      var fieldname = file.fieldname
      filesMeta[fieldname]={}
      filesMeta[fieldname+"Meta"]={}
    
      var newFileName = `${Date.now()}-${Math.round(Math.random() * 1e2)}${path.extname(file.originalname)}`; //save file_name as buffere
      var dbName = fs.readFileSync(file.path); //save file_name as buffere
      var encode_dbName = dbName.toString("base64");
    
      var fileMeta = {
        //contentType: files.mimetype,
        mimetype:file.mimetype,
        encoding:file.encoding,
        originalname:file.originalname,
        originalfname:file.filename,
        destination:file.destination,
        fieldname:file.fieldname,
        filename:newFileName,//file.filename,
        //path:file.path,
        size:file.size,
        dbName: new Buffer(encode_dbName, "base64"),
      };
    
      filesMeta[fieldname]="/public/uploads/"+fileMeta.originalfname
      filesMeta[fieldname+"Meta"]=fileMeta

    }catch{    }
  }
  ////console.log('request with UploadFile_Detected [Files]',filesMeta)
  return filesMeta
}
// SET STORAGE//Where to save


// SET STORAGE//Where to save


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
        return await createStatment(reqData,reqData['onplayOps'] ?? 'CreateRowItem').then((modelData)=>{
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
            return await updateStatment(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
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
    return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //-----------
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
  //-----
  let reqParams = req.query ?? (req.params ?? {})
  console.log(reqParams,'requestparams==========',(Object.keys(reqParams).length == 0))
  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //------------
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
//---------supplierModel------------------END

//---------mispayModel------------------END

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
  return await createmonpay(reqData,reqData['onplayOps'] ?? 'CreateRowItem').then((modelData)=>{
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
      return await updatemonpay(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
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
  let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
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
  let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
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

//-------

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
  return await createmispay(reqData,reqData['onplayOps'] ?? 'CreateRowItem').then((modelData)=>{
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
      return await updatemispay(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
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
  let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //------------
  let sortBy={}
  //------------
  try {
    let modelData =( reqParams['and'] ?? false) ? //queries Combinations ( ored or anded)
          await rOps(modelIII, findBy, returnWat, limits,sortBy):
          await rOrp(modelIII, findBy, returnWat, limits,sortBy)
    res.set(_setResponseHeader)
    console.log(modelData,modelIII,mispayModel)
    return res.status(modelData.status).json(modelData.data);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error); }
});

// Get a single product by ID                           
router.get(modelIIIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
  if(!userId){ 
    //return res.status(401).send({ message: "NullData(P) Received." });    
  }
  //-------------------
  let reqParams = req.query ?? (req.params ?? {})
  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Search Query is null ?");
  }else{}
  //------------------------
  let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
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

//----------------------------------Query Builder
// API
//-------------------------------parametries Quering (Query Builder)
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
