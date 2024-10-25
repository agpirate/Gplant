//const express = require('express');
import {
  profileModel,
} from "app/src-ssr/backendCore/models/profileModels";

import { Router } from "express";
import multer from "multer";

const path = require("path");

import { _filesMeta} from "../../services/fileServices/fileMetas.js" 
import { _fileMeta} from "../../services/fileServices/fileMetas.js" //_thefilePath

import { rOrp,rOp,rOps,dOps } from "app/src-ssr/services/dBServices/documentRead.js";//
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js";//

import authenticate from "../../middlewares/authenticate.js";

import compression from "compression";

//require('dotenv').config()
//const dotenv = require('dotenv');
//dotenv.config();

const router = Router();

const fs = require("fs");

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];

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

// SET STORAGE//Where to save

//====================  CREATING   ========================
// import computeEmployee  from "app/src-ssr/services/comput_employee";
import { createProfile,updateProfile } from "app/src-ssr/services/profileServices/profileServices.js";
const modelI = profileModel
const modelIName = "/profile"

// SET STORAGE//Where to save
router.post(modelIName, async (req, res) => {
          //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
          let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
          if(!userId){ 
            //return res.status(404).send({ message: "NullData(P +token) Received." });    
          }
          //--------------------
          let reqParams = req.query ? req.query : req.params;
          //-------------------------- is there form_Data
          var file_ = (reqParams?.['file_'] ?? false)
          //----------
          let reqData= {};
          if(file_){
            if(file_.files ?? false){
              multer(getFileOptions()).fields([{name:file_.files,maxCount:4}])(req, res, async (multerError) => {
                  //-----------Extracting Request_Body & Validate
                  reqData= req.body ?? {};
                  if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
                  //-----------------------FileMeta Injecting
                  if(multerError){
                    return res.status(303).send({ message: "Uploading Error" +multerError })
                  }else{
                    let filesMeta = req.files ?? false
                    if(filesMeta){
                      let _fileMeta = await _filesMeta(filesMeta)
                      reqData[file_.files] =_fileMeta[file_.files] //{'profile':['filepat',]}
                      //reqData[file_.files+'Meta'] = _fileMeta[file_.files+'Meta']
                    }
                  }
                  //----------------SET FILE ATTributes
                  //------------------
                  reqData['userId']=userId
                
                return await createProfile(reqData).then((modelData)=>{
                  res.set(_setResponseHeader)
                  return res.status(modelData.status).send(modelData.data);                 
                })
                })}
          }
     else{
            //-----------Extracting Request_Body & Validate
            reqData= req.body ?? {};
            if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
            //------
            reqData['userId']=userId
            //----------------SET FILE ATTributes
            return await createProfile(reqData,'UpdateRowItem').then((modelData)=>{
              res.set(_setResponseHeader)
              return res.status(modelData.status).send(modelData.data);                 
            })         
        }
      });

router.put(modelIName,authenticate, async (req, res) => {
      //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
      let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
      if(!userId){ return res.status(404).send({ message: "NullData(P +token) Received." }); }
      //--------------------
      //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
      let reqParams = req.query ? req.query : req.params;
      //-------------------------- is there form_Data
      var file_ = (reqParams?.['file_'] ?? false) 
      //NBBBB:===formData with fileInside won't let you see the body/file content untill reaches first into multer
      console.log("is File In ?",file_)
      //--------------------------
      let reqData= {};
      if(file_){
        if(file_.files ?? false){
          multer(getFileOptions()).fields([{name:file_.files,maxCount:4}])(req, res, async (multerError) => {
            //-----------Extracting Request_Body & Validate
            reqData= req.body ?? {};
            if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
            //-----------------------FileMeta Injecting
            if(multerError){
              return res.status(303).send({ message: "Uploading Error" +multerError })
            }else{
              let filesMeta = req.files ?? false
              if(filesMeta){
                let _fileMeta = await _filesMeta(filesMeta)
                reqData[file_.files] =_fileMeta[file_.files] //{'profile':['filepat',]}
                //reqData[file_.files+'Meta'] = _fileMeta[file_.files+'Meta']
              }
            }
            //----------------SET FILE ATTributes
            //------------------
            reqData['userId']=userId
            return await updateProfile(reqData).then((modelData)=>{
              res.set(_setResponseHeader)
              return res.status(modelData.status).send(modelData.data);                 
            })
        })}
        else if(file_.file ?? false){ 
          multer(getFileOptions()).single(file_.file)(req, res, async (multerError) => {
            //-----------Extracting Request_Body & Validate
            reqData= req.body ?? {};
            if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
            //--------------------------
            if(multerError){
              return res.status(303).send({ message: "Uploading Error" +multerError })
            }else{
              let fileMeta = req.file ?? false
              if(fileMeta){
                let _Meta = await _fileMeta(fileMeta)
                reqData[file_.file] =_Meta[file_.file] //{'profile':['filepat',]}
                //reqData[file_.file+'Meta'] = _Meta[file_.file+'Meta']
              }
            }
            //------------------
            reqData['userId']=userId
            return await updateProfile(reqData).then((modelData)=>{
              res.set(_setResponseHeader)
              return res.status(modelData.status).send(modelData.data);                 
            })
        })}
      }
   else{
          reqData= req.body ?? {};
          if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
          //---
          reqData['userId']=userId
          //----------------SET FILE ATTributes
          return await updateProfile(reqData,'UpdateRowItem',reqData['onplaySubops']).then((modelData)=>{
          console.log(modelData.status,'Updating User')
            res.set(_setResponseHeader)
            return res.status(modelData.status).send(modelData.data);                 
          })
        }
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

//----------------------------------Query Builder
// API

//----------------------------------Query Builder
// API
export default router



  //if filtering findBy != {}...
  // { $or: [   { age: 28 }, { age: 1 } ],... }........instead of findBy { key:value,key:value }
  // { age: {{ $in:[ 28, 1] },  },... }........instead of findBy { key:value,key:value }
