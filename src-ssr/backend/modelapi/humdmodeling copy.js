//const express = require('express');
import {
  leavereqModel,
  reportModel,
  planModel,
  empyModel,
  attendModel,
  comtModel,
  postModel,
} from "app/src-ssr/backendCore/models/humanresource";

import { Router } from "express";
import multer from "multer";
const path = require("path");
import compression from "compression";

const router = Router();

//import { rawModel,  empyModel} from "app/src-ssr/backendCore/models/salemicService/sale"

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

//---------empyModel------------------END

router.get("/empySchema", async (req, res) => {
  //Extracting requestResource...
  //.... doing data manipulating for mongoodb
  let findBy = await _queryParams({ id: "653f9933b13147926d66aa72" });
  returnWat = {}; //it
  let limits = 1;

  try {
    return await empyModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelData) => {
        //{first} :- [filterBy]  ;- [second} :- [returning columns],... function_3 (callback/response handler when O/p is coming)
        res.set(resHeader);
        return res.json(modelData);
      })
      .catch((modelError) => {
        return res.status(404).json(modelError);
      }); // return modelError
  } catch (error) {
    return res.status(404).json(error);
  }
});

//-----------------------============

router.post("/leavereq", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //----------checkfor Duplication

    //-------------------------------====================================
    reqData = { ...reqData, tQ: 0, tC: 0, tQC: 0, tQs: 0, tQCs: 0 };
    reqData = {
      ...reqData,
      tQCp: 0,
      tQCr: 0,
      tQt: 0,
      tQCt: 0,
      tQCtp: 0,
      tQCtr: 0,
    };

    reqData["tQCwzh"] = 0; //with hold on receivable or paid

    reqData["tQCsvat"] = 0; //vat on receivable or paid
    reqData["tQCtvat"] = 0; //vat on receivable or paid

    //---------------------------------------------------------============================
    let Doc = new leavereqModel(reqData);
    ////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((response) => {
        if (Object.keys(response).length) {
          res.set(resHeader);
          return res.send(response);
          //return { status: 200, data: response };
        } else {
          return res.status(404).json({ error: "Error Alert" });
        }
      })
      .catch((modelError) => {
        return res.status(404).json({ error: "Error Creating" + modelError });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

router.put("/leavereq", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }

  //-------------------------------====================================

  //---------------------------------------------------------============================

  try {
    return await leavereqModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.send(response);
            } else {
              return res.status(404).json({ error: "Error Alert" + response });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      });
  } catch {}
});

router.patch("/leavereq", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    return await leavereqModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            //console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.send(response);
            } else {
              return res.status(404).json({ error: "Error Alert" });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

// Get all products
router.get("/leavereqs", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(leavereqModel, findBy, returnWat, limits);
    ////console.log(response["data"].length, "responseeeeeeee");
    if (response.status === 200) {
      res.set(resHeader);
      let resp = response["data"];
      console.log(resp.length, findBy, "fOOOOOOOOOOOOOOfindby");
      return res.send(resp);
    } else {
      return res
        .status(404)
        .send({ error: "404 Product not found" + response });
    } // or just -- [ res.status(404).send(err);  ]
  } catch (error) {
    return res.status(505).json({ error: "505,Internal server error" + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/leavereq", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(leavereqModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response.data);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/leavereq", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}
  try {
    let response = await dOps(leavereqModel, findBy[0]["_id"]); //send Id_value only
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});

//------------------------------------=======

router.post("/report", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //----------checkfor Duplication

    //-------------------------------====================================
    reqData = { ...reqData, tQ: 0, tC: 0, tQC: 0, tQs: 0, tQCs: 0 };
    reqData = {
      ...reqData,
      tQCp: 0,
      tQCr: 0,
      tQt: 0,
      tQCt: 0,
      tQCtp: 0,
      tQCtr: 0,
    };

    reqData["tQCwzh"] = 0; //with hold on receivable or paid

    reqData["tQCsvat"] = 0; //vat on receivable or paid
    reqData["tQCtvat"] = 0; //vat on receivable or paid

    //---------------------------------------------------------============================
    let Doc = new reportModel(reqData);
    ////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((response) => {
        if (Object.keys(response).length) {
          res.set(resHeader);
          return res.send(response);
          //return { status: 200, data: response };
        } else {
          return res.status(404).json({ error: "Error Alert" });
        }
      })
      .catch((modelError) => {
        return res.status(404).json({ error: "Error Creating" + modelError });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

router.put("/report", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }

  //-------------------------------====================================

  //---------------------------------------------------------============================

  try {
    return await reportModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.send(response);
            } else {
              return res.status(404).json({ error: "Error Alert" + response });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      });
  } catch {}
});

router.patch("/report", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    return await reportModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            //console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.send(response);
            } else {
              return res.status(404).json({ error: "Error Alert" });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

// Get all products
router.get("/reports", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(reportModel, findBy, returnWat, limits);
    ////console.log(response["data"].length, "responseeeeeeee");
    if (response.status === 200) {
      res.set(resHeader);
      let resp = response["data"];
      console.log(resp.length, findBy, "fOOOOOOOOOOOOOOfindby");
      return res.send(resp);
    } else {
      return res
        .status(404)
        .send({ error: "404 Product not found" + response });
    } // or just -- [ res.status(404).send(err);  ]
  } catch (error) {
    return res.status(505).json({ error: "505,Internal server error" + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/report", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(reportModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response.data);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/report", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}
  try {
    let response = await dOps(reportModel, findBy[0]["_id"]); //send Id_value only
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});

//====================  CREATING   ========================
//------------planner

router.post("/plan", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //----------checkfor Duplication

    //-------------------------------====================================
    reqData = { ...reqData, tQ: 0, tC: 0, tQC: 0, tQs: 0, tQCs: 0 };
    reqData = {
      ...reqData,
      tQCp: 0,
      tQCr: 0,
      tQt: 0,
      tQCt: 0,
      tQCtp: 0,
      tQCtr: 0,
    };

    reqData["tQCwzh"] = 0; //with hold on receivable or paid

    reqData["tQCsvat"] = 0; //vat on receivable or paid
    reqData["tQCtvat"] = 0; //vat on receivable or paid

    //---------------------------------------------------------============================
    let Doc = new planModel(reqData);
    ////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((response) => {
        if (Object.keys(response).length) {
          res.set(resHeader);
          return res.send(response);
          //return { status: 200, data: response };
        } else {
          return res.status(404).json({ error: "Error Alert" });
        }
      })
      .catch((modelError) => {
        return res.status(404).json({ error: "Error Creating" + modelError });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

router.put("/plan", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }

  //-------------------------------====================================

  //---------------------------------------------------------============================

  try {
    return await planModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.send(response);
            } else {
              return res.status(404).json({ error: "Error Alert" + response });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      });
  } catch {}
});

router.patch("/plan", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    return await planModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            //console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.send(response);
            } else {
              return res.status(404).json({ error: "Error Alert" });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

// Get all products
router.get("/plans", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(planModel, findBy, returnWat, limits);
    ////console.log(response["data"].length, "responseeeeeeee");
    if (response.status === 200) {
      res.set(resHeader);
      let resp = response["data"];
      console.log(resp.length, findBy, "fOOOOOOOOOOOOOOfindby");
      return res.send(resp);
    } else {
      return res
        .status(404)
        .send({ error: "404 Product not found" + response });
    } // or just -- [ res.status(404).send(err);  ]
  } catch (error) {
    return res.status(505).json({ error: "505,Internal server error" + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/plan", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(planModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response.data);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/plan", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}
  try {
    let response = await dOps(planModel, findBy[0]["_id"]); //send Id_value only
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});

//====================  CREATING   ========================
async function computSal(_earn) {
  var inTax = 0;

  //gEarn= salaryExp.grossSalary;//reqData['tQC']
  const gEarn = _earn;
  if (gEarn <= 600) {
    inTax = 0;
  } else if (gEarn > 600 && gEarn <= 1650) {
    inTax = gEarn * 0.1 - 60;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX1", inTax, gEarn);
  } else if (gEarn > 1650 && gEarn <= 3200) {
    inTax = gEarn * 0.3 - 142.5;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX2", inTax, gEarn);
  } else if (gEarn > 3200 && gEarn <= 5250) {
    inTax = gEarn * 0.2 - 302.5;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX3", inTax, gEarn);
  } else if (gEarn > 5250 && gEarn <= 7800) {
    inTax = gEarn * 0.25 - 565;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX4", inTax, gEarn);
  } else if (gEarn > 7800 && gEarn <= 10900) {
    inTax = gEarn * 0.3 - 955;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX5", inTax, gEarn);
  } else if (gEarn > 10900) {
    inTax = gEarn * 0.35 - 1500;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX6", inTax, gEarn);
  }
  return inTax;
}

async function computEmp(reqData) {
  //--------------------------------------=============================
  /*
  reqData["tQ"] = 1;
  reqData["tC"] = 0;
  reqData["tQC"] = 0;

  reqData["tQs"] = 0;
  reqData["tQCs"] = 0;
  reqData["tQt"] = 0;
  reqData["netSalary"] = 0; //hold normal conditions salary(net)
  reqData["taxableSalary"] = 0; //holding taxable salary
*/
  var overTime = 0;
  var pensionRate = 0;
  var topUp = 0;
  var grossSalary = 0;

  if (!nul.includes(reqData.salary)) {
    if (!nul.includes(reqData.salary.overTime)) {
      overTime = Number(reqData.salary.overTime);
    }
    if (!nul.includes(reqData.salary.topUp)) {
      topUp = Number(reqData.salary.topUp);
    }
    if (!nul.includes(reqData.salary.grossSalary)) {
      let payableSalary = Number(reqData.salary.grossSalary); /// payableDays;
      grossSalary = Number(payableSalary);
    }
  }

  if (!nul.includes(reqData.pensionRate)) {
    pensionRate = Number(reqData.pensionRate);
  }

  var gEarn = Number(grossSalary + overTime + topUp); // - loan
  reqData["netSalary"] = 0;
  reqData["taxableSalary"] = 0;
  //console.log(gEarn,'Gearn')

  await computSal(gEarn).then((inTax) => {
    //let gEarn = gEarng
    reqData["incomeTax"] = Number(inTax);
    reqData["pension"] = Number(gEarn * pensionRate);
    reqData["taxableSalary"] = gEarn;

    var loan = 0;
    if (!nul.includes(reqData.loan)) {
      loan = Number(reqData.loan);
    }

    let totalDeduction = Number(inTax + gEarn * pensionRate + loan);
    reqData["netSalary"] = Number(gEarn - totalDeduction);
    reqData["taxableSalary"] = Number(gEarn).toFixed(2); //reqData['taxableSalary'];// gEarn - inTax - reqData['pension'] - loan;//+ Number(reqData.salary.loan) )

    if (!nul.includes(reqData.salary)) {
      if (!nul.includes(reqData.salary.allowance)) {
        //if allowance is existing reculculate the netSalary
        let transport = nul.includes(reqData.salary.allowance.transport)
          ? 0
          : Number(reqData.salary.allowance.transport);
        let houseRent = nul.includes(reqData.salary.allowance.houseRent)
          ? 0
          : Number(reqData.salary.allowance.houseRent);
        let phone = nul.includes(reqData.salary.allowance.phone)
          ? 0
          : Number(reqData.salary.allowance.phone);

        let taxFreepay = transport + phone + houseRent;

        reqData["tQC"] = gEarn + taxFreepay; //).toFixed(2);
        reqData["netSalary"] = reqData["netSalary"] + taxFreepay;
      } else {
        reqData["tQC"] = 0;
      }
    }

    //console.log('REEEEEEEEEEEEEEEE',gEarn) ....if compayn is offering 11% of gross(basic salary ) as pensions(extra value for each employees) or Remote it
    //it require reculculating(accomulating pensions and tQC values)

    reqData["pensionNet"] = nul.includes(reqData["pension"])
      ? 0
      : Number(reqData["pension"] + grossSalary * 0.11).toFixed(2);

    reqData["tQC"] = nul.includes(reqData["tQC"])
      ? 0
      : Number(
          Number(reqData["tQC"]) + grossSalary * (pensionRate + 0.11)
        ).toFixed(2);
  });

    if (!nul.includes(reqData["companyID"])) {
      let lowring = reqData["companyID"].toLowerCase();
      reqData["profile"] = "/assets/yirgupic/pro" + lowring + ".jpg";
      reqData["CvFiles"] = "/assets/yirgupic/cv" + lowring + ".zip";
    }

  return reqData;
}

async function create_employee(reqData) {
  //else{}

  var empData = await computEmp(reqData);
  try {
    //----------checkfor Duplication
    // Save the new customer to the database
    let Doc = new empyModel(empData);
    ////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    return await Doc.save()
      .then((response) => {
        if (Object.keys(response).length) {
          return { status: 200, data: response };
        } else {
          //return res.status(404).json({ error: "Error Alert" });
          return { status: 404, data: response };
        }
      })
      .catch((modelError) => {
        //return res.status(404).json({ error: "Error Creating" + modelError });
        return { status: 404, data: modelError };
      })
      .catch((error) => {
        //return res.status(404).json({ error: "Error Alert" + error });
        return { status: 404, data: error };
      }      ).catch((modelQAR)=>{
        return { status:303,data:modelQAR}
 
      })
  
} catch { 
  console.log( "Succefylly Updated-000"); 
   return { status: 505, data: 'Server Error' };}

}
router.post("/empy", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }

  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }

  await create_employee(reqData).then((response) => {
    console.log(response, "response");
    if (response.status == 200) {
      res.set(resHeader);
      res.cookie("access_token", "sessionsID", { httpOnly: true });
      //return res.json(response);
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "Error Alert" });
    }
  }); //wait for returning or let it response it'self

  //--------------------------------------================================
});

router.post(
  "/upload",
  handleMultipartData.single("profile"),
  async (req, res) => {
    //Extracting requestResource...
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    if (!Object.keys(reqData).length) {
      return false;
    }
    let [findBy, returnWat, limits] = await _postputParams(reqParams);

    if (!findBy) {
      return res.status(404).send({ message: "paramError" });
    }

    //--------------------------------------================================
    try {
      // Save the new customer to the database
      let Doc = new empyModel(reqData);
      ////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
      await Doc.save()
        .then((response) => {
          if (Object.keys(response).length) {
            res.set(resHeader);
            res.cookie("access_token", "sessionsID", { httpOnly: true });
            return res.json(response);
            //return { status: 200, data: response };
          } else {
            return res.status(404).json({ error: "Error Alert" });
          }
        })
        .catch((modelError) => {
          return res.status(404).json({ error: "Error Creating" + modelError });
        })
        .catch((error) => {
          return res.status(404).json({ error: "Error Alert" + error });
        });
    } catch {
      return res.status(505).json({ error: "Server Error" });
    }
  }
);

async function update_employee(reqParams,reqData){

  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    //return { status: 404, data: "NoParams" };//return res.status(404).json({ error: "Error Alert" + response });
    //return res.status(404).send({ message: "paramError" });
  }

  console.log( "Succefylly Updated-0");

  var empData = await computEmp(reqData);
  console.log(empData, "Succefylly Updated-2");

  try {
    // Save the new customer to the database
    return await empyModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {

  console.log(empData, "Succefylly Updated-3");

        Object.assign(modelQA, empData);
        return  modelQA
          .save()
          .then((response) => {
  console.log( "Succefylly Updated-0");

            console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              //res.set(resHeader);
              return { status: 200, data: response };//return res.json(response);
            } else {
              return { status: 404, data: response };//return res.status(404).json({ error: "Error Alert" + response });
            }
          })
          .catch((modelError) => {
        console.log(modelError,'modalsErrr')

            return { status: 404, data: modelError };//return res.status(404).json({ error: "Error Alert" + modelError });
          });
      }
      ).catch((modelQAR)=>{
        console.log(modelQAR,'modalsErrr')
        return { status:303,data:modelQAR}
      })
  
} catch { 
  console.log( "Succefylly Updated-000"); 
   return { status: 505, data: 'Server Error' };}
}

router.put("/empy", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  multer(getFileOptions()).single("profile")  (req, res, async (err) => {
      
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    let [reqFiles, reqFile] = [
      nul.includes(req.files) ? false : req.files,
      nul.includes(req.file) ? false : req.file,
    ];
    let filesMeta ={}
    console.log(reqData,reqFiles,reqFile,'fffffffffffffssssssssssssss')

      //------------request meta data_analysis
      if(reqFile || reqFiles){
            if (req.fileValidationError) {
              return res.send(req.fileValidationError);
            } else if (!req.file) {
              return res.send("Please select an image to upload");
            } else if (err instanceof multer.MulterError) {
              return res.send(err);
            } else if (err) {
              return res.send(err);
            }

             filesMeta = await extractFilesMeta([reqFile])


      }
           

            if (!Object.keys(reqData).length) {
              // return false;
            }
            
            console.log("calllledddddDDDDDDDDDDDDDd",filesMeta, reqData,reqFile);
              
             let fileOne={}

    //console.log(reqData,'fffffffffffffssssssssssssss')
     
   reqData=Object.assign(reqData,filesMeta)
 // reqData['profile'] =filesMeta['profile']

  await update_employee(reqParams,reqData).then((response) => {
    
    if (response.status == 200) {
      //console.log(response, "response");
      res.set(resHeader);
      res.cookie("access_token", "sessionsID", { httpOnly: true });
      //return res.json(response);
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "Error Alert" });
    }
  }); //wait for returning or let it response it'self

  //--------------------------------------================================
  })
});

// Get all products
router.get("/empys", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(empyModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});

// Get a single product by ID                             ///search?q=axios&page=2
router.get("/empy", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOp(empyModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/empy", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(empyModel, findBy[0]["_id"]); //send Id_value only
    if (response.status == 200) {
      res.set(resHeader);
      return res.json(response["data"]); //res.json({ data: response['data'], status: "success" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//------------------------------------------attend
//====================  CREATING   ========================

router.post("/attend", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}
  //-----------
  //get the month ( )

  let _thatDate = nul.includes(reqData["updatedAt"])
    ? new Date()
    : reqData["updatedAt"]; //take today or thatDay
  let __thisDate = new Date(_thatDate);
  let __thatYear = __thatDate.getFullYear();
  let __thatMonth = __thatDate.getMonth();
  let __numDaysofMonth = new Date(__thatYear, __thatMonth, 0).getDate();

  reqData = { ...reqData, tQ: 0, tC: 0, tQC: 0 };

  let presenceDays = 0;
  for (let dayInx = 0; dayInx < __numDaysofMonth; dayInx++) {
    var isSunday = __thatDate.getDay();
    var presenceDay = "D" + dayInx;
    if (![0, "0"].includes(isSunday)) {
      //it's sundary jump it
      if (reqData[presenceDay] == "1") {
        presenceDays += 1;
      }
    }
  }

  let paydays = nul.includes(reqData.payDays)
    ? 0
    : Number(reqData.payDays).toFixed(2);
  let netSalary = nul.includes(reqData.netSalary)
    ? 0
    : Number(reqData.netSalary); //holding the unitcost or set_of_unitCost
  reqData.tQ = presenceDays;
  reqData.tC = netSalary; //holding the unitcost or set_of_unitCost
  if (!nul.includes(reqData.payDays) && reqData.payDays !== 0) {
    try {
      reqData.salaryNet = parseFloat(
        (Number(netSalary) / Number(paydays)) * Number(presenceDays)
      ).toFixed(2);
    } catch {
      reqData.salaryNet = 0;
    }
  }
  reqData.salaryNet = Number(reqData.salaryNet) + Number(reqData.taxfreeSalary);

  var pension = nul.includes(reqData.pension) ? 0 : Number(reqData.pension); //holding the unitcost or set_of_unitCost
  if (!nul.includes(reqData.payDays) && reqData.payDays !== 0) {
    try {
      reqData.pension = (
        (Number(pension) / Number(paydays)) *
        Number(presenceDays)
      ).toFixed(2);
    } catch {
      reqData.pension = 0;
    }
  }
  // //console.log(salaryNet,'salaryNet',reqData.salaryNet+ reqData.taxfreeSalary,)

  var incomeTax = nul.includes(reqData.incomeTax)
    ? 0
    : Number(reqData.incomeTax); //holding the unitcost or set_of_unitCost

  if (!nul.includes(reqData.payDays) && reqData.payDays !== 0) {
    try {
      reqData.incomeTax = parseFloat(
        (Number(incomeTax) / Number(paydays)) * Number(presenceDays)
      ).toFixed(2);
    } catch {
      reqData.incomeTax = 0;
    }
  }

  //------------if company_pensions is
  let companyPension = netSalary * 0.11;
  reqData["tQC"] = Number(reqData.netSalary + companyPension).toFixed(2); //is not required..
  reqData.pension = Number(reqData.pension) + Number(companyPension); //.toFixed(2);

  //----------------
  try {
    //----------checkfor Duplication
    let existingCustomer = await attendModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits);
    if (existingCustomer) {
      return res
        .status(404)
        .json({ error: "Duplicated Item" + existingCustomer });
    }

    // Save the new customer to the database
    let Doc = new attendModel(reqData);
    //////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((response) => {
        if (Object.keys(response).length) {
          res.set(resHeader);
          return res.json(response);
          //return { status: 200, data: response };
        } else {
          return res.status(404).json({ error: "Error Alert" });
        }
      })
      .catch((modelError) => {
        return res.status(404).json({ error: "Error Creating" + modelError });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

router.put("/attend", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }

  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}
  //.updateOne({ $or: findBy },{reqData})
  //         .then((response) => {

  let _thatDate = nul.includes(reqData["updatedAt"])
    ? new Date()
    : reqData["updatedAt"]; //take today or thatDay
  let __thisDate = new Date(_thatDate);
  let __thatYear = __thatDate.getFullYear();
  let __thatMonth = __thatDate.getMonth();
  let __numDaysofMonth = new Date(__thatYear, __thatMonth, 0).getDate();

  reqData = { ...reqData, tQ: 0, tC: 0, tQC: 0 };

  let presenceDays = 0;
  for (let dayInx = 0; dayInx < __numDaysofMonth; dayInx++) {
    var isSunday = __thatDate.getDay();
    var presenceDay = "D" + dayInx;
    if (![0, "0"].includes(isSunday)) {
      //it's sundary jump it
      if (reqData[presenceDay] == "1") {
        presenceDays += 1;
      }
    }
  }

  let paydays = nul.includes(reqData.payDays)
    ? 0
    : Number(reqData.payDays).toFixed(2);
  let netSalary = nul.includes(reqData.netSalary)
    ? 0
    : Number(reqData.netSalary); //holding the unitcost or set_of_unitCost
  reqData.tQ = presenceDays;
  reqData.tC = netSalary; //holding the unitcost or set_of_unitCost
  if (!nul.includes(reqData.payDays) && reqData.payDays !== 0) {
    try {
      reqData.salaryNet = parseFloat(
        (Number(netSalary) / Number(paydays)) * Number(presenceDays)
      ).toFixed(2);
    } catch {
      reqData.salaryNet = 0;
    }
  }
  reqData.salaryNet = Number(reqData.salaryNet) + Number(reqData.taxfreeSalary);

  var pension = nul.includes(reqData.pension) ? 0 : Number(reqData.pension); //holding the unitcost or set_of_unitCost
  if (!nul.includes(reqData.payDays) && reqData.payDays !== 0) {
    try {
      reqData.pension = (
        (Number(pension) / Number(paydays)) *
        Number(presenceDays)
      ).toFixed(2);
    } catch {
      reqData.pension = 0;
    }
  }
  // //console.log(salaryNet,'salaryNet',reqData.salaryNet+ reqData.taxfreeSalary,)

  var incomeTax = nul.includes(reqData.incomeTax)
    ? 0
    : Number(reqData.incomeTax); //holding the unitcost or set_of_unitCost

  if (!nul.includes(reqData.payDays) && reqData.payDays !== 0) {
    try {
      reqData.incomeTax = parseFloat(
        (Number(incomeTax) / Number(paydays)) * Number(presenceDays)
      ).toFixed(2);
    } catch {
      reqData.incomeTax = 0;
    }
  }

  //------------if company_pensions is
  let companyPension = netSalary * 0.11;
  reqData["tQC"] = Number(reqData.netSalary + companyPension).toFixed(2); //is not required..
  reqData.pension = Number(reqData.pension) + Number(companyPension); //.toFixed(2);

  try {
    return await attendModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            //console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.json(response);
            } else {
              return res.status(404).json({ error: "Error Alert" + response });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      });
  } catch {}
});

// Get all products
router.get("/attends", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(attendModel, findBy, returnWat, limits);
    //////console.log(response["data"].length, "responseeeeeeee");
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/attend", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(attendModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/attend", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(attendModel, findBy[0]["_id"]); //send Id_value only
    if (response.status == 200) {
      res.set(resHeader);
      return res.json(response["data"]); //res.json({ data: response['data'], status: "success" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});

//---------postModel------------------END

//-------------------------------parametries Quering (Query Builder)

//-------------------------commts

//====================  CREATING   ========================

//====================  CREATING   ========================
router.post("/comt", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //----------checkfor Duplication
    /*
    let existingCustomer = await comtModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits);
    if (existingCustomer) {
      return res
        .status(404)
        .json({ error: "Duplicated Item" + existingCustomer });
    }
    */
    // Save the new customer to the database
    let Doc = new comtModel(reqData);
    //////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((response) => {
        if (Object.keys(response).length) {
          res.set(resHeader);
          return res.json(response);
          //return { status: 200, data: response };
        } else {
          return res.status(404).json({ error: "Error Alert" });
        }
      })
      .catch((modelError) => {
        return res.status(404).json({ error: "Error Creating" + modelError });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

router.put("/comt", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}
  //.updateOne({ $or: findBy },{reqData})
  //         .then((response) => {
  try {
    return await comtModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            //console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.json(response);
            } else {
              return res.status(404).json({ error: "Error Alert" + response });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      });
  } catch {}
});

router.patch("/comt", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    return await comtModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            ////console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.json(response);
            } else {
              return res.status(404).json({ error: "Error Alert" });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

// Get all products
router.get("/comts", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(comtModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/comt", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(comtModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/comt", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(comtModel, findBy[0]["_id"]); //send Id_value only
    if (response.status == 200) {
      res.set(resHeader);
      return res.json(response["data"]); //res.json({ data: response['data'], status: "success" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------post
//====================  CREATING   ========================

//====================  CREATING   ========================
router.post("/post", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //----------checkfor Duplication
    /*
    let existingCustomer = await postModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits);
    if (existingCustomer) {
      return res
        .status(404)
        .json({ error: "Duplicated Item" + existingCustomer });
    }
    */
    // Save the new customer to the database
    let Doc = new postModel(reqData);
    ////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((response) => {
        if (Object.keys(response).length) {
          res.set(resHeader);
          return res.json(response);
          //return { status: 200, data: response };
        } else {
          return res.status(404).json({ error: "Error Alert" });
        }
      })
      .catch((modelError) => {
        return res.status(404).json({ error: "Error Creating" + modelError });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

router.put("/post", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}
  //.updateOne({ $or: findBy },{reqData})
  //         .then((response) => {
  try {
    return await postModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.json(response);
            } else {
              return res.status(404).json({ error: "Error Alert" + response });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      });
  } catch {}
});

router.patch("/post", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    return await postModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((response) => {
            //console.log(response, "Succefylly Updated");
            if (Object.keys(response).length) {
              res.set(resHeader);
              return res.json(response);
            } else {
              return res.status(404).json({ error: "Error Alert" });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Error Alert" + error });
      });
  } catch {
    return res.status(505).json({ error: "Server Error" });
  }
});

// Get all products
router.get("/posts", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(postModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/post", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(postModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.send(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/post", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(postModel, findBy[0]["_id"]); //send Id_value only
    if (response.status == 200) {
      res.set(resHeader);
      return res.json(response["data"]); //res.json({ data: response['data'], status: "success" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});

//----------------------------------Query Builder
// API
//-------------------------------parametries Quering (Query Builder)
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

  //.... doing data manipulating for mongoodb
  let findBy = Object.keys(reqParams).length
    ? await _queryParams(reqParams)
    : [{}];

  return [findBy, returnWat, limits];
}

async function _getdeleteParams(reqParams = {}) {
  if (Object.keys(reqParams).length === 0) {
    //return [false];
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

  //.... doing data manipulating for mongoodb
  let findBy = Object.keys(reqParams).length
    ? await _queryParams(reqParams)
    : [{}];

  return [findBy, returnWat, limits];
}

async function _queryParams(params = {}) {
  let parseQuery = delete params["timestamp"];
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
    obj[keyTranslating] = parseQuery[paramKey]; //if  param_key != id , use as it's.... & resolve the incoming :key:value
    theQuery.push(obj);
  }
  if (!theQuery.length) {
    theQuery = [{}];
  } else {
    theQuery = theQuery.filter(
      (obj) => !(obj && Object.keys(obj).length === 0)
    );
  }
  //console.log("Quering Parsing Service..", theQuery);
  return theQuery;
}
//----------------------------------Query Builder
// API
module.exports = router;

const rOps = async function (
  dbModel,
  findBy = [{}],
  returnWat = {},
  limits = 1000
) {
  try {
    return await dbModel
      .find({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits) //return the latest of 100
      .then((modelData) => {
        if (modelData.length) {
          //return data..with out the first data of schemas...
          var extraction = modelData; ////.slice(0, -2); //is slcing the schema & model items.....from coming (if limits item are below 100)
          let response = {};
          if (extraction.length) {
            console.log(
              extraction.length,
              "RRRRRRRRpppppppppxxxRRRRRRR",
              findBy
            );
            return { status: 200, data: JSON.stringify(extraction) };
          } else {
            response = { status: 404, data: "Data Not Found" };
          }
          return response;
        } else {
          return { status: 404, error: "Server Error" };
        }
      })
      .catch((modelError) => {
        return { status: 404, error: "Data Error" + modelError };
      }); // return modelError res.json("please Correct Your Query..!, controller..")
    //{first} :- [filterBy]  ;- [second} :- [returning columns],... function_3 (callback/response handler when O/p is coming)
  } catch (error) {
    return { status: 505, error: "Server Error" + error };
  }
};

const rOp = async function (
  dbModel,
  findBy = [],
  returnWat = {},
  limits = 1000
) {
  //if filtering findBy != {}...
  // { $or: [   { age: 28 }, { age: 1 } ],... }........instead of findBy { key:value,key:value }
  // { age: {{ $in:[ 28, 1] },  },... }........instead of findBy { key:value,key:value }
  //
  //console.log("readOperations...", findBy);

  try {
    return await dbModel
      .find({ $or: findBy }, returnWat) //match findBy....if not find return "null"
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelData) => {
        if (modelData.length) {
          return { status: 200, data: JSON.stringify(modelData) };
        } else {
          return { status: 404, error: "Server Error" };
        }
        //{first} :- [filterBy]  ;- [second} :- [returning columns],... function_3 (callback/response handler when O/p is coming)
      })
      .catch((modelError) => {
        return { status: 404, error: "Server Error" + modelError };
      }); // return modelError
  } catch (error) {
    return { status: 505, error: "Server Error" + error };
  }
};

const dOps = async function (dbModel, itemId, returnWat = {}, limits = 100) {
  try {
    //console.log("Deleting Dops with", itemId);
    return await dbModel
      .findByIdAndDelete(itemId) //or simply >>--  findBy['id']
      .then((modelData) => {
        //console.log("deleting maintens..", modelData);
        if (Object.keys(modelData).length) {
          return { status: 200, data: JSON.stringify(modelData) };
        } else {
          return { status: 404, error: "Server Error" };
        }
        //res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
      })
      .catch((modelError) => {
        return { status: 404, error: "DBs Error" + modelError };
      }); //res.status(505).send({message: "Could not delete User with id=" + id });
  } catch {
    return { status: 505, error: "Server Error" };
  }
};
