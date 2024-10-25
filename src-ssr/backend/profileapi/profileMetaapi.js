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

//require('dotenv').config()
//const dotenv = require('dotenv');
//dotenv.config();

const router = Router();

const fs = require("fs");

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];

let resHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "50000000000",
  'ETag': "Roaw",
  "Set-Cookie": 'Httponly;SameSite=None;',
  "Access-Control-Allow-Credentials": "true",
  'cookie' : "witcher=Geralt; SameSite=None;",
  'aaaa':'aaaa'
};

let setCookies = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
  "Set-Cookie": ["type=ninja", "language=javascript"],
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
// SET STORAGE//Where to save

//---------empyModel------------------END
//-----------------------============
async function compLeavreq(reqData){
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
    
    return reqData
}

router.post("/leavereq", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }

  if(!nul.includes(reqData['gmStatus'])){
    reqData['_stage_']=_stage_
    }

  //else{}
    const reqDataa = await compLeavreq(reqData)
  try {
    //----------checkfor Duplication
    //---------------------------------------------------------============================
    let Doc = new leavereqModel(reqDataa);
    ////////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((modelData) => {
        if (typeof modelData == 'object' && Object.keys(modelData).length) {
          res.set(resHeader);
          return res.send(modelData);
          //return { status: 200, data: modelData };
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
    return res.status(404).send({ message: "Form Filling Required." });
  }


  if(!nul.includes(reqData['gmStatus'])){
    reqData['_stage_']=_stage_
    }

  //-------------------------------====================================
  const reqDataa = await compLeavreq(reqData)

  //---------------------------------------------------------============================

  try {
    return await leavereqModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqDataa);
        modelQA
          .save()
          .then((modelData) => {
            ////console.log(modelData, "Succefylly Updated");
            if (typeof modelData == 'object' && Object.keys(modelData).length) {
              res.set(resHeader);
              return res.send(modelData);
            } else {
              return res.status(404).json({ error: "Error Alert"  });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
        }).catch((modelError) => {
          return res.status(404).json({ error: "Error Alert" + modelError });
        });
    } catch { return res.status(505).json({ error: "Server Error" });}
  });
// Get all products
router.get("/leavereqs", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    let modelData = await rOps(leavereqModel, findBy, returnWat, limits);
    ////////console.log(modelData["data"].length, "modelDataeeeeeee");
    if (modelData.status === 200) {
      res.set(resHeader);
      let resp = modelData["data"];
      ////console.log(resp.length, findBy, "fOOOOOOOOOOOOOOfindby");
      return res.send(resp);
    } else {
      return res
        .status(404)
        .send({ error: "404 ; Failed to Load" + req.url  });
    } // or just -- [ res.status(404).send(err);  ]
  } catch (error) {
    return res.status(505).json({ error: "505,Isr " + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/leavereq", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let modelData = await rOp(leavereqModel, findBy, returnWat, limits);
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData.data);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/leavereq", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}
  try {
    let modelData = await dOps(leavereqModel, reqParams["id"]); //send Id_value only
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});

//------------------------------------=======

async function compReport(reqData){
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

  return reqData
}
router.post("/report", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  if(!nul.includes(reqData['gmStatus'])){
    reqData['_stage_']=_stage_
    }

  const reqDataa = await compReport(reqData)
  try {
    //---------------------------------------------------------============================
    let Doc = new reportModel(reqDataa);
    ////////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((modelData) => {
        if (typeof modelData == 'object' && Object.keys(modelData).length) {
          res.set(resHeader);
          return res.send(modelData);
          //return { status: 200, data: modelData };
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


  if(!nul.includes(reqData['gmStatus'])){
    reqData['_stage_']=_stage_
    }

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }

  //-------------------------------====================================
  const reqDataa = await compReport(reqData)

  //---------------------------------------------------------============================

  try {
    return await reportModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqDataa);
        modelQA
          .save()
          .then((modelData) => {
            ////console.log(modelData, "Succefylly Updated");
            if (typeof modelData == 'object' && Object.keys(modelData).length) {
              res.set(resHeader);
              return res.send(modelData);
            } else {
              return res.status(404).json({ error: "Error Alert"  });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
        }).catch((modelError) => {
          return res.status(404).json({ error: "Error Alert" + modelError });
        });
    } catch { return res.status(505).json({ error: "Server Error" });}
  });

// Get all products
router.get("/reports", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  //////console.log(req.url,'url of request......')

  try {
    let modelData = await rOps(reportModel, findBy, returnWat, limits);
    ////////console.log(modelData["data"].length, "modelDataeeeeeee");
    if (modelData.status === 200) {
      res.set(resHeader);
      let resp = modelData["data"];
      ////console.log(resp.length, findBy, "fOOOOOOOOOOOOOOfindby");
      return res.send(resp);
    } else {
      return res
        .status(404)
        .send({ error: "404 ; Failed to Load" + req.url  });
    } // or just -- [ res.status(404).send(err);  ]
  } catch (error) {
    return res.status(505).json({ error: "505,Isr " + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/report", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let modelData = await rOp(reportModel, findBy, returnWat, limits);
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData.data);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/report", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}
  try {
    let modelData = await dOps(reportModel, reqParams["id"]); //send Id_value only
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});

//====================  CREATING   ========================

async function compPlan(reqData){
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

  return reqData
}
//------------planner

router.post("/plan", async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  if (!Object.keys(reqData).length) {
    return false;
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  if(!nul.includes(reqData['gmStatus'])){
    reqData['_stage_']=_stage_
    }

  const reqDataa = await compPlan(reqData)

  try {
    //----------checkfor Duplication
    //---------------------------------------------------------============================
    let Doc = new planModel(reqDataa);
    ////////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((modelData) => {
        if (typeof modelData == 'object' && Object.keys(modelData).length) {
          res.set(resHeader);
          return res.send(modelData);
          //return { status: 200, data: modelData };
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
    return res.status(404).send({ message: "Form Filling Required." });
  }


  if(!nul.includes(reqData['gmStatus'])){
    reqData['_stage_']=_stage_
    }

  //-------------------------------====================================
  const reqDataa = await compPlan(reqData)

  //---------------------------------------------------------============================

  try {
    return await planModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqDataa);
        modelQA
          .save()
          .then((modelData) => {
            ////console.log(modelData, "Succefylly Updated");
            if (typeof modelData == 'object' && Object.keys(modelData).length) {
              res.set(resHeader);
              return res.send(modelData);
            } else {
              return res.status(404).json({ error: "Error Alert"  });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
        }).catch((modelError) => {
          return res.status(404).json({ error: "Error Alert" + modelError });
        });
    } catch { return res.status(505).json({ error: "Server Error" });}
  });
// Get all products
router.get("/plans", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    let modelData = await rOps(planModel, findBy, returnWat, limits);
    ////////console.log(modelData["data"].length, "modelDataeeeeeee");
    if (modelData.status === 200) {
      res.set(resHeader);
      let resp = modelData["data"];
      ////console.log(resp.length, findBy, "fOOOOOOOOOOOOOOfindby");
      return res.send(resp);
    } else {
      return res
        .status(404)
        .send({ error: "404 ; Failed to Load" + req.url  });
    } // or just -- [ res.status(404).send(err);  ]
  } catch (error) {
    return res.status(505).json({ error: "505,Isr " + error });
  }
});
// Get a single attend by ID                             ///search?q=axios&page=2
router.get("/plan", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let modelData = await rOp(planModel, findBy, returnWat, limits);
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData.data);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/plan", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}
  try {
    let modelData = await dOps(planModel, reqParams["id"]); //send Id_value only
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});

//------------------------------------------attend

//====================  CREATING   ========================
import computeattendance  from "app/src-ssr/services/comput_attendance";
const modelI = attendModel
const modelIName = "/attend"

router.post(modelIName, async (req, res) => {
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [reqFiles, reqFile] = [
    nul.includes(req.files) ? false : req.files,
    nul.includes(req.file) ? false : req.file,
  ];
  ////console.log(reqData,'Computing Init+++++++++++++*****************+++++++++++++++++++++++')

  if (typeof reqData == 'object' && Object.keys(reqData).length == 0) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }

  //--------
  var ErrorDepth = "Computing Processing.."
  //------
  var reqDataa = await computeattendance(reqData);
  //-----
  if(!nul.includes(reqData['gmStatus'])){
    reqDataa['_stage_'] = 10
    }
  //--------------
  //---------------------------===========================================
  //----
  ErrorDepth="_incomingData Computing Completed...withFile_;" ;//+ isxFile
  //---------
//console.log(reqDataa,'request data........post')
  //---------------------------===========================================
  //////console.log("prodddddddddddddductioooooooooooooooooo", reqDataa);
  try {
    //----------checkfor Duplication
    //Goes Here
    //---------------------------------------------------------============================
    let Doc = new modelI(reqDataa);
    ////console.log(Doc)

    return await Doc.save().then((modelData) => {
      //////console.log(modelData,'Saved')
      if (typeof modelData == 'object' && Object.keys(modelData).length) {
        res.set(resHeader);
        return res.send(modelData);
      } else { 
        ErrorDepth="_incomingData Saving Completed,but Null_Obj..withFile_;"
      //////console.log(ErrorDepth)

        return res.status(404).json("(Srv):- _del202;but(DBs)_Create303:- " + modelData +"::");
       }
    }).catch((modelError) => {
      ErrorDepth="_incomingData ErrorSaving ...[][][][][[]withFile_;"+modelError
      ////console.log(ErrorDepth)
      return res.status(404).json("(Srv):- _del202;but(DBs)_Create404:- " + modelError +"::" );
    
    });
  } catch { 
  return res.status(505).json("(Srv);- _Create505 "+ErrorDepth);
  }
  });

router.put(modelIName, async (req, res) => {
//Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [reqFiles, reqFile] = [
    nul.includes(req.files) ? false : req.files,
    nul.includes(req.file) ? false : req.file,
  ];

  if (typeof reqData == 'object' && Object.keys(reqData).length == 0) {
    return res.status(404).send({ message: "ReqData to Update is Null" });
  }
  let [findBy, returnWat, limits] = await _postputParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "FindBy Isn't Returning" });
  }


//-------------------------------====================================
var ErrorDepth = "Computing Processing.."
//------
var reqDataa = await computeattendance(reqData);
//-----
if(!nul.includes(reqData['gmStatus'])){
  reqDataa['_stage_'] = 10
  }
//--------------
//----
ErrorDepth="_incomingData Computing Completed...withFile_;" ;//+ isxFile
//---------
try {
  return await modelI
  .findOne({ $or: findBy }, returnWat)
  .sort({ updatedAt:-1 })
  .limit(limits)
  .then((modelQA) => {
    Object.assign(modelQA, reqDataa);
    modelQA.save().then((modelData) => {
        if (typeof modelData == 'object' && Object.keys(modelData).length) {
          res.set(resHeader);
          return res.send(modelData); //responding as {key:value}
        } else { 
          ErrorDepth="_incomingData Saving Completed,but Null_Obj..withFile_;"
          return res.status(404).json("(Srv):- _del202;but(DBs)_Create303:- " + modelData +"::");
         }
      }).catch((modelError) => {
        ErrorDepth="_incomingData ErrorSaving ...withFile_;"+modelError
        return res.status(404).json("(Srv):- _del202;but(DBs)_Create404:- " + modelError +"::" );
      });
    })
 } catch { 
  return res.status(505).json("(Srv);- _Create505 "+ErrorDepth);
  }
});

// Get all products
// Get all products
router.get(modelIName+"s", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    let modelData = await rOps(modelI, findBy, returnWat, limits);
    ////////console.log(modelData["data"].length, "modelDataeeeeeee");
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: "Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get(modelIName, async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let modelData = await rOp(modelI, findBy, returnWat, limits);
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: "Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete(modelIName, async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    let modelData = await dOps(modelI, reqParams["id"]); //send Id_value only
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.json(modelData["data"]); //res.json({ data: modelData['data'], status: "success" });
    } else {
      return res.status(404).json({ error: "Failed to Load - " + req.url });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
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
    return res.status(404).send({ message: "Form Filling Required." });
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
    //////////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((modelData) => {
        if (typeof modelData == 'object' && Object.keys(modelData).length) {
          res.set(resHeader);
          return res.json(modelData);
          //return { status: 200, data: modelData };
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
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}
  //.updateOne({ $or: findBy },{reqData})
  //         .then((modelData) => {
  try {
    return await comtModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((modelData) => {
            //////console.log(modelData, "Succefylly Updated");
            if (typeof modelData == 'object' && Object.keys(modelData).length) {
              res.set(resHeader);
              return res.json(modelData);
            } else {
              return res.status(404).json({ error: "Error Alert"  });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
        }).catch((modelError) => {
          return res.status(404).json({ error: "Error Alert" + modelError });
        });
    } catch { return res.status(505).json({ error: "Server Error" });}
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
    return res.status(404).send({ message: "Form Filling Required." });
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
          .then((modelData) => {
            ////////console.log(modelData, "Succefylly Updated");
            if (typeof modelData == 'object' && Object.keys(modelData).length) {
              res.set(resHeader);
              return res.json(modelData);
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

// Get all attends
router.get("/comts", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    let modelData = await rOps(comtModel, findBy, returnWat, limits);
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
// Get a single attend by ID                             ///search?q=axios&page=2
router.get("/comt", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let modelData = await rOp(comtModel, findBy, returnWat, limits);
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/comt", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    let modelData = await dOps(comtModel, reqParams["id"]); //send Id_value only
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.json(modelData["data"]); //res.json({ data: modelData['data'], status: "success" });
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
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
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {

    if(!nul.includes(reqData['gmStatus'])){
      reqData['_stage_']=_stage_
      }

    // Save the new customer to the database
    let Doc = new postModel(reqData);
    ////////console.log(Doc, reqData, findBy, "PPPPPPPPPP");
    await Doc.save()
      .then((modelData) => {
        if (typeof modelData == 'object' && Object.keys(modelData).length) {
          res.set(resHeader);
          return res.json(modelData);
          //return { status: 200, data: modelData };
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
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}
  //.updateOne({ $or: findBy },{reqData})
  //         .then((modelData) => {

  if(!nul.includes(reqData['gmStatus'])){
    reqData['_stage_']=_stage_
    }

  try {
    return await postModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqData);
        modelQA
          .save()
          .then((modelData) => {
            ////console.log(modelData, "Succefylly Updated");
            if (typeof modelData == 'object' && Object.keys(modelData).length) {
              res.set(resHeader);
              return res.json(modelData);
            } else {
              return res.status(404).json({ error: "Error Alert"  });
            }
          })
          .catch((modelError) => {
            return res.status(404).json({ error: "Error Alert" + modelError });
          });
      }).catch((modelError) => {
        return res.status(404).json({ error: "Error Alert" + modelError });
      });
  } catch { return res.status(505).json({ error: "Server Error" });}
});

// Get all attends
router.get("/posts", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    let modelData = await rOps(postModel, findBy, returnWat, limits);
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
// Get a single product by ID                             ///search?q=axios&page=2
router.get("/post", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let modelData = await rOp(postModel, findBy, returnWat, limits);
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url  });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/post", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "Form Filling Required." });
  }
  //else{}

  try {
    let modelData = await dOps(postModel, reqParams["id"]); //send Id_value only
    if (modelData.status == 200) {
      res.set(resHeader);
      return res.json(modelData["data"]); //res.json({ data: modelData['data'], status: "success" });
    } else {
      return res.status(404).json({ error: " Failed to Load - " + req.url });
    }
  } catch (error) {
    return res.status(505).json({ error: "Isr " + error });
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
  let limits = 0;
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
  
    ////console.log("Findby Profile_DBs(Shared_)_GET/_",findBy)


  return [findBy, returnWat, limits];
}

async function _getdeleteParams(reqParams = {}) {
  if (Object.keys(reqParams).length === 0) {
    //return [false];
  }

  let returnWat = {};
  let limits = 0;
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
    ? await _queryParams(reqParams,1)
    : [{}];

    ////console.log("Findby Profile_DBs(Shared_)_GET/_",findBy)

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
  ////////console.log("Quering Parsing Service..", theQuery);
  return theQuery;
}
//----------------------------------Query Builder
// API
module.exports = router;

const rOps = async function (
  dbModel,
  findBy = [{}],
  returnWat = {},
  limits = -1
) {
  try {
    return await dbModel
    .find({ $or: findBy }, returnWat)
    .sort({updatedAt:-1}) // _id: -1,
    .limit(limits) //return the latest of 100
    .then((modelData) => {  
        ////console.log(modelData.length,"Reading(S) procurment_DBs(Shared_)")
        if (modelData.length) {return { status: 200, data: modelData };
        } else { return { status: 404, data: "(DBs)_read303:- " +modelData }; //not found Errorrer
      } }).catch((modelError) => {
      return { status: 404, data: "(DBs)_read404:- " + modelError }; //DBs_Schema or Rules_validations Error
    }); 
} catch (error) { return { status: 505, data: "(DBs)_read505 :-" };  } //DBs Connections or Configurations, modules Error
};


const rOp = async function (
  dbModel,
  findBy = [{}],
  returnWat = {},
  limits = -1
) {
  try {
    return await dbModel
      .find({ $or: findBy }, returnWat) //match findBy....if not find return "null"
      .sort({ updatedAt:-1 })// _id: -1,
      .limit(limits)
      .then((modelData) => {       
        ////console.log("Reading procurment_DBs(Shared_)")
        if (modelData.length) {return { status: 200, data:modelData };
        } else { return { status: 404, data: "(DBs)_readf303:- " +modelData }; //not found Error
      } }).catch((modelError) => {
      return { status: 404, data: "(DBs)_readf404:- " + modelError }; //DBs_Schema or Rules_validations Error
    }); 
} catch (error) { return { status: 505, data: "(DBs)_readf505 :-" };  } //DBs Connections or Configurations, modules Error
};

const dOps = async function (dbModel, itemId, returnWat = {}, limits = 100) {
  try {
    return await dbModel
      .findByIdAndDelete(itemId) //or simply >>--  findBy['id']
      .then((modelData) => {
        ////console.log("Deleting Procurment_DBs(Shared_)")
        if (typeof modelData == 'object' && Object.keys(modelData).length) { return { status: 200, data: JSON.stringify(modelData) };
        } else { return { status: 404, data: "(DBs)_del303:- " +modelData }; //not found Error
        } }).catch((modelError) => {
        return { status: 404, data: "(DBs)_del404:- " + modelError }; //DBs_Schema or Rules_validations Error
      }); 
  } catch { return { status: 505, data: "(DBs)_del505 :-" };  } //DBs Connections or Configurations, modules Error
};