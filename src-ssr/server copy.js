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
import {
  ssrClose,
  ssrCreate,
  ssrListen,
  ssrRenderPreloadTag,
  ssrServeStaticContent,
} from "quasar/wrappers";
import { planner } from "app/src-ssr/services/planner";
const upload = require("./backend/uploads/upload");
//import { finDBs,humdDBs,procDBs,saleDBs,adminDBs} from "./backendCore/dbConns" // just import them for auto_firing(dur they are const_variables) or use the module.export
const { empyModel } = require("./backendCore/models/humanresource");

const finmodeling = require("./backend/modelapi/finmodeling");
const humdmodeling = require("./backend/modelapi/humdmodeling");
const procmodeling = require("./backend/modelapi/procmodeling");
const salemodeling = require("./backend/modelapi/salemodeling");

//-----------------

const bodyParser = require("body-parser");
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

//====================  CREATING   ========================
async function computSal(_earn) {
  var inTax = 0;

  //gEarn= salaryExp.grossSalary;//reqData['tQC']
  const gEarn = _earn;
  if (gEarn <= 600) {
    inTax = 0;
  } else if (gEarn > 600 && gEarn <= 1650) {
    inTax = gEarn * 0.1 - 60;
    console.log("TTTTTTTAAAAAAAAAXXXXXXXXX1", inTax, gEarn);
  } else if (gEarn > 1650 && gEarn <= 3200) {
    inTax = gEarn * 0.3 - 142.5;
    console.log("TTTTTTTAAAAAAAAAXXXXXXXXX2", inTax, gEarn);
  } else if (gEarn > 3200 && gEarn <= 5250) {
    inTax = gEarn * 0.2 - 302.5;
    console.log("TTTTTTTAAAAAAAAAXXXXXXXXX3", inTax, gEarn);
  } else if (gEarn > 5250 && gEarn <= 7800) {
    inTax = gEarn * 0.25 - 565;
    console.log("TTTTTTTAAAAAAAAAXXXXXXXXX4", inTax, gEarn);
  } else if (gEarn > 7800 && gEarn <= 10900) {
    inTax = gEarn * 0.3 - 955;
    console.log("TTTTTTTAAAAAAAAAXXXXXXXXX5", inTax, gEarn);
  } else if (gEarn > 10900) {
    inTax = gEarn * 0.35 - 1500;
    console.log("TTTTTTTAAAAAAAAAXXXXXXXXX6", inTax, gEarn);
  }
  return inTax;
}

const nul = [null, undefined, false, "", [], {}];
//Session Configuration
const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

///////-----------Headers Response
let resHeader = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "123",
  ETag: "12345",
  "Set-Cookie": ["type=ninja", "language=javascript"],
};
//if (app.get("env") === "production") {
// Serve secure cookies, requires HTTPS
//  session.cookie.secure = true;
//}

async function reqResource(req) {
  // req.body or & params_serialize could comes as get/:value/:value2[req.params] or get?key=valeu;key=value2 {req.query}
  return [req.body, req.query ? req.query : req.params]; // Request is coming as url-encoded/json format of body(data) or params & they require of bodyparse -serializer respectivlly.
}
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

  // ADD THIS
  try {
    var cors = require("cors");
    app.use(cors());
  } catch {}

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
  app.use(bodyParser.json());
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }));

  /*Multer is a node.js middleware for handling multipart/form-data , 
  which is primarily used for uploading files. 
  It is written on top of busboy for maximum efficiency.

  */

  //-------------------------------------------Defined
  // place here any middlewares that
  // absolutely need to run before anything else
  if (process.env.PROD) {
    app.use(compression());
  }

  //------------------------------------------
  const supportedMimes = {
    "text/csv": "csv",
  };
  const uploadsFolder = "uploads";

  const getFileOptions = () => {
    console.log("getfileoptions functions.............");
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "app/src-ssr/assets/uploads"),
        filename: (req, file, cb) => {
          let extension = supportedMimes[file.mimetype];
          let originalname = file.originalname.split(".")[0];
          //`${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
          let fileName =
            originalname + "-" + new Date().getMilliseconds() + "." + extension;
          cb(null, fileName);
        },
      }),
      limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
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

  const uploadFile = (req, res, next) => {
    let savedModels = [];

    console.log(req, "requesssssssssssssssssttttttttttting");
    async.each(
      req.files,
      (file, callback) => {
        let fileModel = new File({
          name: file.filename,
        });
        fileModel.save((err) => {
          if (err) {
            return next("Error creating new file", err);
          }
          fileModel.encodedName = btoa(fileModel._id);
          fileModel.save((err) => {
            if (err) {
              return next("Error creating new file", err);
            }
            savedModels.push(fileModel);
            callback();
            console.log("File created successfully");
          });
        });
      },
      (err) => {
        if (err) {
          return res.status(400).end();
        }
        return res.send(savedModels);
      }
    );
  };

  // SET STORAGE//Where to save
  //Assign the folder where user images should be stored first.
  let storage = multer.diskStorage({
    destination: "./public/uploads", //directory (folder) setting
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname); // file name setting
    },
  });

  //Upload Setting
  const mulHa = multer({
    storage: storage,
  });

  const options = getFileOptions();
  const multerHandler = multer(getFileOptions());
  const mulHandler = {
    arrayFile: async (req, res, filenames) => {
      multerHandler(req, res).array(filenames);
      //multer(getFileOptions()).array(filenames)
    },
  };

  const singleFile = async function (req, res, filename) {
    multer({ storage: storage }).single(filename)(req, res, (err) => {
      if (err) {
        res.status(400).send("Something went wrong!");
      }
      //res.send(req.file);
      return;
    });

    return;
  };

  app.post("/api/uploadd", multerHandler.any(), uploadFile);

  app.post("/api/upload", (req, res) => {
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    console.log(reqData, "MMMMMMMCCCCCCCCCMMMMMMMMMMMMM", req.file);

    singleFile(req, res, "proImage").then(() => {
      console.log("singleFile Handled..................~~~");
    });

    console.log(reqData, "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM", req.file);
    res.send(req.file);
  });

  app.post("/api/uploads", mulHa.array("proImage"), async (req, res) => {
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];

    let [reqFiles,reqFile] = [req.files ? "" : req.files, req.file ? "" : req.file];
    console.log("calllledddddDDDDDDDDDDDDDd", reqData);
    //let { filenames, originalnames, mimetype, buffer } = reqFiles;

    if (!Object.keys(reqData).length) {
      // return false;
    }

    let [findBy, returnWat, limits] = await _postputParams(reqParams);

    if (!findBy) {
      // return res.status(404).send({ message: "paramError" });
    }

    ///let filenames=[]
    console.log(reqFiles, "FFFFFFFFFFFFFFFfile...", req.files);
    //let { fieldname, originalname, mimetype, buffer } = req.file;

    reqFiles.forEach((singale_image) => {
      empyModel
        .findOne({ Picture: singale_image.filename })
        .then((a) => {
          if (a) {
            console.log("Your Image Dulicate, Please Try anoter Images");
          } else {
            var img = fs.readFileSync(req.files.path);
            var encode_img = img.toString("base64");
            var final_img = {
              contentType: req.files.mimetype,
              proImage: new Buffer(encode_img, "base64"),
            };

            empyModel
              .create(final_img)
              .then((res) => {
                res.contentType(final_img.contentType);
                res.send(final_img.proImage);
              })
              .catch((y) => {
                console.log(y);
              });
          }
        })
        .catch((b) => {
          console.log(b);
        });
    });
  });

  //========================================================DEFINED APIs

  //====================  CREATING   ========================
  app.post("/api/user", async (req, res) => {
    //Extracting requestResource...
    /*
    img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
        */
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    if (!Object.keys(reqData).length) {
      return false;
    }
    let [findBy, returnWat, limits] = await _postputParams(reqParams);

    if (!findBy) {
      return res.status(404).send({ message: "paramError" });
    }

    let [reqFiles, reqFile] = [
      req.files ? "" : req.files,
      req.file ? "" : req.file,
    ];

    //if (req.body.img) {
    //reqData.img = {
    //  data: fs.readFileSync(
    //   path.join(__dirname + "/src/assets/uploads/" + req.body.img)
    // ),
    // contentType: "image/*",
    //  };
    //reqData['img']=req.file.img
    //}

    //-------------============================================7

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

    if (!nul.includes(reqData.salary.overTime)) {
      overTime = Number(reqData.salary.overTime);
    }

    if (!nul.includes(reqData.pensionRate)) {
      pensionRate = Number(reqData.pensionRate);
    }
    if (!nul.includes(reqData.salary.topUp)) {
      topUp = Number(reqData.salary.topUp);
    }

    if (!nul.includes(reqData.salary.grossSalary)) {
      let payableSalary = Number(reqData.salary.grossSalary); /// payableDays;
      grossSalary = Number(payableSalary).toFixed(2);
    }

    var gEarn = Number(grossSalary + overTime + topUp).toFixed(2); // - loan
    reqData["netSalary"] = 0;
    reqData["taxableSalary"] = 0;
    //console.log(gEarn,'Gearn')
    await computSal(gEarn).then((inTax) => {
      //let gEarn = gEarng
      reqData["incomeTax"] = inTax;
      reqData["pension"] = Number(gEarn * pensionRate);
      reqData["taxableSalary"] = gEarn;

      var loan = 0;
      if (!nul.includes(reqData.loan)) {
        loan = Number(reqData.loan);
      }
      try {
        let totalDeduction = Number(inTax + gEarn * pensionRate + loan);
        reqData["netSalary"] = Number(gEarn - totalDeduction).toFixed(2);
        reqData["taxableSalary"] = Number(gEarn).toFixed(2); //reqData['taxableSalary'];// gEarn - inTax - reqData['pension'] - loan;//+ Number(reqData.salary.loan) )
      } catch {}

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

        let taxFreepay = Number(transport + phone + houseRent);

        reqData["tQC"] = Number(gEarn + taxFreepay).toFixed(2);
        reqData["netSalary"] = Number(
          reqData["netSalary"] + taxFreepay
        ).toFixed(2);
      } else {
        reqData["tQC"] = 0;
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

    try {
      //----------checkfor Duplication
      let existingCustomer = await empyModel.findOne(
        { $or: findBy },
        returnWat
      );
      if (existingCustomer) {
        return res
          .status(404)
          .json({ error: "Duplicated Item" + existingCustomer });
      }

      // Save the new customer to the database
      let Doc = new empyModel(reqData);
      console.log(Doc, reqData, findBy, "PPPPPPPPPP");
      await Doc.save()
        .then((response) => {
          if (Object.keys(response).length) {
            res.set(resHeader);
            return res.json(response);
            //return { status: 200, data: response };
          } else {
            return res.status(404).json({ error: "error.message" });
          }
        })
        .catch((modelError) => {
          return res.status(404).json({ error: "Error Creating" + modelError });
        })
        .catch((error) => {
          return res.status(404).json({ error: "error.message" + error });
        });
    } catch {
      return res.status(505).json({ error: "Server Error" });
    }
  });
  //====================  UPDATING  ========================

  // This route should **not** use `lean()`, because lean means no `save()`.
  app.put("/api/user", async function (req, res) {
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

    if (!nul.includes(reqData.salary.overTime)) {
      overTime = Number(reqData.salary.overTime);
    }

    if (!nul.includes(reqData.pensionRate)) {
      pensionRate = Number(reqData.pensionRate);
    }
    if (!nul.includes(reqData.salary.topUp)) {
      topUp = Number(reqData.salary.topUp);
    }

    if (!nul.includes(reqData.salary.grossSalary)) {
      let payableSalary = Number(reqData.salary.grossSalary); // / payableDays;
      grossSalary = Number(payableSalary).toFixed(2);
    }

    var gEarn = Number(grossSalary + overTime + topUp).toFixed(2); // - loan
    reqData["netSalary"] = 0;
    reqData["taxableSalary"] = 0;
    //console.log(gEarn,'Gearn')
    await computSal(gEarn).then((inTax) => {
      //let gEarn = gEarng
      reqData["incomeTax"] = inTax;
      reqData["pension"] = Number(gEarn * pensionRate);
      reqData["taxableSalary"] = gEarn;

      var loan = 0;
      if (!nul.includes(reqData.loan)) {
        loan = Number(reqData.loan);
      }
      try {
        let totalDeduction = Number(inTax + gEarn * pensionRate + loan);
        reqData["netSalary"] = Number(gEarn - totalDeduction).toFixed(2);
        reqData["taxableSalary"] = Number(gEarn).toFixed(2); //reqData['taxableSalary'];// gEarn - inTax - reqData['pension'] - loan;//+ Number(reqData.salary.loan) )
      } catch {}

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

        let taxFreepay = Number(transport + phone + houseRent);

        reqData["tQC"] = Number(gEarn + taxFreepay).toFixed(2);
        reqData["netSalary"] = Number(
          reqData["netSalary"] + taxFreepay
        ).toFixed(2);
      } else {
        reqData["tQC"] = 0;
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

    //---------------------------------=======================

    try {
      return await empyModel
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
                return res
                  .status(404)
                  .json({ error: "Error Alert" + response });
              }
            })
            .catch((modelError) => {
              return res
                .status(404)
                .json({ error: "Error Alert" + modelError });
            });
        });
    } catch {}
  });

  //====================  AUTHENTICATING + Schematic ========================
  //UserAuthenticating...
  app.post("/api/login", async (req, res) => {
    //Extracting requestResource...
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    if (!Object.keys(reqData).length) {
      return res.status(404).send({ message: "Content can not be emtpy!" });
    }

    let [findBy, returnWat, limits] = await _postputParams(reqParams);
    //.... doing data manipulating for mongoodb
    //let findBy = await _queryParams(reqParams); //reqParams['keyID']
    returnWat = {}; //it
    //let limits = 1;

    //.... doing data manipulating for mongoodb
    findBy = [{ keyID: findBy[0]["_id"] }];
    try {
      return await empyModel //"Autherizations.keyID" : value
        .findOne({ $or: findBy }, returnWat) //return null if empty
        .sort({ _id: 1 })
        .limit(limits)
        .then((modelData) => {
          console.log(findBy, "findby", modelData, "modaldata");
          //{first} :- [filterBy]  ;- [second} :- [returning columns],... function_3 (callback/response handler when O/p is coming)
          if (modelData) {
            //let plans = planner()
            res.set(resHeader);
            //return res.json(plans);
            return res.json(modelData);
          } else {
            return res.status(404).json("modelError " + modelData);
          }
        })
        .catch((modelError) => {
          return res.status(404).json({ data: modelError });
        }); // return modelError
    } catch (error) {
      return res.status(404).json({ data: error });
    }
  });

  //====================  FINDING  ======================== giveMe  one/all....matched?

  app.get("/api/users", async function (req, res) {
    // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    //Extracting requestResource...
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    if (!Object.keys(reqData).length) {
      //return false;
    }
    let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

    if (!findBy) {
      return res.status(404).send({ message: "paramError" });
    }

    //

    try {
      return await empyModel
        .find({ $or: findBy }, returnWat)
        .sort({ _id: -1 })
        .limit(limits)
        .then((modelData) => {
          if (modelData) {
            console.log(findBy, "Server users Get Response #");
            var extraction = modelData; //.slice(0, 1); //is slcing the schema & model items.....from coming (if numbers item are below 100)
            res.set(resHeader);
            if (extraction.length) {
              return res.json(extraction);
            } else {
              return res.status(404).json({ data: "Data Not Found" });
            }
          } else {
            return res.status(404).json({ data: "Data Not Found" + modelData });
          }
        })
        .catch((modelError) => {
          return res.status(404).json({ data: "Data Not Found" + modelError });
        }); // return modelError res.json("please Correct Your Query..!, controller..")
      //{first} :- [filterBy]  ;- [second} :- [returning columns],... function_3 (callback/response handler when O/p is coming)
    } catch (error) {
      return res.status(404).json({ data: "Data Not Found" + error });
    }
  });

  app.get("/api/user", async (req, res) => {
    //Extracting requestResource...
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    if (!Object.keys(reqData).length) {
      //return false;
    }
    let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

    if (!findBy) {
      return res.status(404).send({ message: "paramError" });
    }

    //---------------

    try {
      return await empyModel
        .find({ $or: findBy }, returnWat)
        .sort({ _id: -1 })
        .limit(limits)
        .then((modelData) => {
          console.log(modelData, "Server user  Get Response #", findBy);
          //{first} :- [filterBy]  ;- [second} :- [returning columns],... function_3 (callback/response handler when O/p is coming)
          if (modelData) {
            res.set(resHeader);
            return res.json(modelData);
          } else {
            return res.status(404).json({ data: "Data Not Found" + modelData });
          }
        })
        .catch((modelError) => {
          return res.status(404).json({ data: "Data Not Found" + modelError }); // return modelError
        });
    } catch (error) {
      return res.status(505).json({ data: "Data Not Found" + error });
    }
  });

  //====================  DELETING  ========================

  app.delete("/api/user", async function (req, res) {
    //Extracting requestResource...
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    if (!Object.keys(reqData).length) {
      //return false;
    }
    let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

    if (!findBy) {
      return res.status(404).send({ message: "paramError" });
    }

    try {
      //console.log("Deleting Dops with", itemId);
      return await empyModel
        .findByIdAndDelete(findBy[0]["_id"]) //or simply >>--  findBy['id']
        .then((modelData) => {
          if (Object.keys(modelData).length) {
            //res.set(resHeader);
            return res.json(modelData);
          } else {
            return res.status(404).json({ error: "error.message" + modelData });
          }
          //res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        })
        .catch((modelError) => {
          return res.status(404).json({ error: "error.message" });
        }); //res.status(505).send({message: "Could not delete User with id=" + id });
    } catch {
      return res.status(505).json({ error: "Server Error" });
    }
  });

  //-------------[[[[[[[[[[[[[[[[[ DATA MODELING ROUTRS ]]]]]]]]]]]]]]]]]]] ataModeling api-controller-services-mongoosing(CRUD)

  app.use("/fincrud", finmodeling); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  app.use("/humdcrud", humdmodeling); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  app.use("/procrud", procmodeling); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  app.use("/salecrud", salemodeling); //referess... to...database of procurment ( microservice_crudAPI) of  with it's own database & multiple model
  //app.get('/humdcrud', humdApi )     //database of humanResDev ( microservice_crudAPI) of it's own database & multiple model
  //app.get('/fincrud', finApi )     //database of Finance ( microservice_crudAPI) of it's own database & multiple model
  //app.get('/salecrud', saleApi )     //database of Sale ( microservice_crudAPI) of it's own database & multiple model

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
  return app.listen(port, () => {
    if (process.env.PROD) {
      //console.log('Server listening at port ' + port)
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
    if (keyTranslating === "id") {
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
  console.log("Quering Parsing Service..", theQuery);
  return theQuery;
}
//----------------------------------Query Builder

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
