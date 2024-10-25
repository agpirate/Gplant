//const express = require('express');
import {
  statmentModel,
  monpayModel,
  mispayModel,
} from "app/src-ssr/backendCore/models/finance";

import { Router } from "express";
import { statments } from "app/src-ssr/services/expenseService";
const router = Router();

//import { rawModel,  mispayModel} from "app/src-ssr/backendCore/models/salemicService/sale"

///////-----------Headers Response
let resHeader = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
  "Set-Cookie": ["type=ninja", "language=javascript"],
};

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];

//====================  CREATING   ========================
async function compStatment(reqData) {
  reqData = {
    ...reqData,
    tIP: 0, //total income paid
    tIR: 0, //total income receivable

    tIGs: 0,
    tIPr: 0,

    tI: 0,

    tXP: 0, ///total expense paid
    tXR: 0, //total expense receivable
    tX: 0,

    Incm: 0,
  };

  if (!nul.includes(reqData["PD_G_Inc"] || reqData["RL_G_Inc"])) {
    reqData["tIGs"] = (
      Number(reqData["PD_G_Inc"]) + Number(reqData["RL_G_Inc"])
    ).toFixed(2);
  }
  if (!nul.includes(reqData["RL_P_Inc"] || reqData["PD_P_Inc"])) {
    reqData["tIPr"] = (
      Number(reqData["RL_P_Inc"]) + Number(reqData["PD_P_Inc"])
    ).toFixed(2);
  }

  if (!nul.includes(reqData["PD_G_Inc"] || reqData["PD_P_Inc"])) {
    reqData["tIP"] = (
      Number(reqData["PD_P_Inc"]) + Number(reqData["PD_G_Inc"])
    ).toFixed(2);
  }
  if (!nul.includes(reqData["RL_G_Inc"])) {
    reqData["tIR"] = (
      Number(reqData["RL_P_Inc"]) + Number(reqData["RL_G_Inc"])
    ).toFixed(2);
  }
  if (!nul.includes(reqData["tIR"] || reqData["tIP"])) {
    reqData["tI"] = Number(
      Number(reqData["tIR"]) + Number(reqData["tIP"])
    ).toFixed(2);
  }

  if (
    !nul.includes(
      reqData["PD_P_Exp"] || reqData["Mis_Exp"] || reqData["incomeTax"]
    )
  ) {
    reqData["tXR"] = (
      Number(reqData["Mis_Exp"]) +
      Number(reqData["incomeTax"]) +
      Number(reqData["PD_P_Exp"]) +
      Number(reqData["Mon_Exp"])
    ).toFixed(2);
  }
  if (!nul.includes(reqData["RL_P_Exp"])) {
    reqData["tXP"] = Number(reqData["RL_P_Exp"]).toFixed(2);
  }
  if (!nul.includes(reqData["tXP"] || reqData["tXR"])) {
    reqData["tX"] = Number(
      Number(reqData["tXP"]) + Number(reqData["tXR"])
    ).toFixed(2);
  }

  if (!nul.includes(reqData["tX"] || reqData["tI"])) {
    reqData["Incm"] = (Number(reqData["tI"]) - Number(reqData["tX"])).toFixed(
      2
    );
  }

  return reqData;
}
router.post("/statment", async (req, res) => {
  //Extracting requestResource... //creating is loading in statments &  when it's called we load all the staffss..

  try {
    return await statments()
      .then((response) => {
        //console.log(Object.keys(response).length, findBy, "PPPPPPPPPP");
        if (Object.keys(response).length) {
          //---------------automatically register the values
          let Doc = new statmentModel(response);
          Doc.save()
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
              return res
                .status(404)
                .json({ error: "Error Creating" + modelError });
            });
          //---------------------------register
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

router.put("/statment", async (req, res) => {
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
  const reqDataa = await compStatment(reqData);

  try {
    return await statmentModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqDataa);
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

// Get all products
router.get("/statments", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(statmentModel, findBy, returnWat, limits);
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
router.get("/statment", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(statmentModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.json(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/statment", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(statmentModel, reqParams["id"]); //send Id_value only
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
//---------supplierModel------------------END

//---------mispayModel------------------END
async function compMonpay(reqData) {
  const monthlySalary = nul.includes(reqData["monthlySalary"])
    ? 0
    : Number(reqData["monthlySalary"]);
  const employeeTax = nul.includes(reqData["employeeTax"])
    ? 0
    : Number(reqData["employeeTax"]);
  const incomeTax = nul.includes(reqData["incomeTax"])
    ? 0
    : Number(reqData["incomeTax"]);
  const power = nul.includes(reqData["power"]) ? 0 : Number(reqData["power"]);
  const water = nul.includes(reqData["water"]) ? 0 : Number(reqData["water"]);
  const tele = nul.includes(reqData["tele"]) ? 0 : Number(reqData["tele"]);
  const withhold = nul.includes(reqData["withhold"])
    ? 0
    : Number(reqData["withhold"]);

  reqData["tQC"] = (
    monthlySalary +
    employeeTax +
    incomeTax +
    power +
    water +
    tele +
    withhold
  ).toFixed(2);
  reqData["tQ"] = 1; //monthlySalary + employeeTax + incomeTax + power + water + tele +withhold;
  reqData["tC"] = reqData["tQC"]; //monthlySalary + employeeTax + incomeTax + power + water + tele +withhold;

  return reqData;
}

//====================  CREATING   ========================
router.post("/monpay", async (req, res) => {
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

  const reqDataa = await compMonpay(reqData);

  try {
    //----------checkfor Duplication
    /*
    let existingCustomer = await monpayModel
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
    let Doc = new monpayModel(reqDataa);
    await Doc.save()
      .then((response) => {
        console.log(Object.keys(response).length, findBy, "PPPPPPPPPP");

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

router.put("/monpay", async (req, res) => {
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

  //---------------------==================

  const reqDataa = await compMonpay(reqData);
  //-------------------=============

  try {
    return await monpayModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqDataa);
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

// Get all products
router.get("/monpays", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(monpayModel, findBy, returnWat, limits);
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
router.get("/monpay", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(monpayModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.json(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/monpay", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(monpayModel, reqParams["id"]); //send Id_value only
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
//--

//-------
async function compMispay(reqData) {
  reqData["tQ"] = 1;
  reqData["tC"] = 0;
  reqData["tQC"] = 0;

  const amount = nul.includes(reqData["amount"])
    ? 0
    : Number(reqData["amount"]);
  const otheramount = nul.includes(reqData["otherExp"]["amount"])
    ? 0
    : Number(reqData["otherExp"]["amount"]);

  reqData["tC"] = (amount + otheramount).toFixed(2); // Number(misCost).toFixed(2);
  reqData["tQC"] = (amount + otheramount).toFixed(2); ///Number(misCost).toFixed(2);

  return reqData;
}
//====================  CREATING   ========================
router.post("/mispay", async (req, res) => {
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
  //---------------------==============================
  const reqDataa = await compMispay(reqData);
  //----------------==================================
  try {
    //----------checkfor Duplication
    /*
    let existingCustomer = await mispayModel
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
    let Doc = new mispayModel(reqDataa);
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

router.put("/mispay", async (req, res) => {
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
  //-------------
  const reqDataa = await compMispay(reqData);
  //---------------
  try {
    return await mispayModel
      .findOne({ $or: findBy }, returnWat)
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelQA) => {
        Object.assign(modelQA, reqDataa);
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

// Get all products
router.get("/mispays", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(mispayModel, findBy, returnWat, limits);
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
router.get("/mispay", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(mispayModel, findBy, returnWat, limits);
    if (response.status == 200) {
      res.set(resHeader);
      return res.json(response["data"]);
    } else {
      return res.status(404).json({ error: "Product not found" + response });
    }
  } catch (error) {
    return res.status(505).json({ error: "Internal server error" + error });
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete("/mispay", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(mispayModel, reqParams["id"]); //send Id_value only
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


async function _queryParams(params = {},isget=1) {
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
    if(isget){
      obj[keyTranslating] = {$regex : parseQuery[paramKey].toString(), "$options": "i" }
      // parseQuery[paramKey]; //if  param_key != id , use as it's.... & resolve the incoming :key:value

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
              returnWat
            );
            return { status: 200, data: extraction };
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
