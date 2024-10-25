//const express = require('express');
import {
  custModel,
  goodModel,
  productModel,
} from "app/src-ssr/backendCore/models/sale";
import { Router } from "express";
const router = Router();

///////-----------Headers Response
let resHeader = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
  "Set-Cookie": ["type=ninja", "language=javascript"],
};

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];
//---------custModel------------------END

router.get("/custSchema", async (req, res) => {
  //Extracting requestResource...
  //.... doing data manipulating for mongoodb
  let findBy = await _queryParams({ id: "653f9933b13147926d66aa72" });
  returnWat = {}; //it
  let limits = 1;

  try {
    return await custModel
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

//====================  CREATING   ========================
//====================  CREATING   ========================

let customerTimer = "green";
async function reminderDays(day, lastUpdates) {
  // Get current date
  var date = new Date(lastUpdates);

  // Add five days to current date
  let days = Number(day);
  let thegoodDays = new Date(lastUpdates).setDate(
    new Date(lastUpdates).getDate() + days - 7
  );
  let thewarnDays = date.setDate(date.getDate() + days - 3);
  let theendDays = date.setDate(date.getDate() + days);

  if (new Date() >= thegoodDays) {
    customerTimer = "green";
  } else if (new Date() >= thewarnDays) {
    customerTimer = "orange";
  } else if (new Date() >= theendDays) {
    customerTimer = "red";
  }

  return customerTimer;
}

//====================  CREATING   ========================
router.post("/cust", async (req, res) => {
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
    let existingCustomer = await custModel
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
    let Doc = new custModel(reqData);
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

router.put("/cust", async (req, res) => {
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
    return await custModel
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

// Get all products
router.get("/custs", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(custModel, findBy, returnWat, limits);
    ////console.log(response["data"].length, "responseeeeeeee");

    if (response.status == 200) {
      /*
      try {
        response["data"]["flagColor"] = reminderDays(
          response["data"]["reminderDays"],
          response["data"]["updatedAt"]
        );
      } catch {}
*/
      //response["data"]["tQ"] = "rose";
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
router.get("/cust", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(custModel, findBy, returnWat, limits);
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
router.delete("/cust", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(custModel, reqParams["id"]); //send Id_value only
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
//---------goodModel------------------END

async function compGoods(reqData) {
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

  var procCost = nul.includes(reqData["cost"]) ? 0 : Number(reqData["cost"]); //unit price give as number or set_of_object like below
  var ItemQs = nul.includes(reqData["ItemQs"]) ? 0 : Number(reqData["ItemQs"]); //unit price give as number or set_of_object like below
  //unit price give as number or set_of_object like below
  /*
  if (!nul.includes(reqData["cost"]) && Object.keys(reqData["cost"]).length) {
    var procIns = reqData["cost"];
    var unitCost = nul.includes(procIns["unitCost"])
      ? 0
      : Number(procIns["unitCost"]);
    var importCost = nul.includes(procIns["importCost"])
      ? 0
      : Number(procIns["importCost"]);
    var otherCosts = nul.includes(procIns["otherCosts"])
      ? 0
      : Number(procIns["otherCosts"]);

    procCost = unitCost + importCost + otherCosts;
  }
   */
  var finCost = 0;
  if (
    !nul.includes(reqData["financeStatus"]) &&
    Object.keys(reqData["financeStatus"]).length
  ) {
    var finIns = reqData["financeStatus"];
    finCost = nul.includes(finIns["totalCost"])
      ? 0
      : Number(finIns["totalCost"]); //unit price give as number or set_of_object like below
    var witholdTax = nul.includes(finIns["witholdTax"])
      ? 0
      : Number(finIns["witholdTax"]); //unit price give as number or set_of_object like below

    finIns["witholdTax"] = (witholdTax + Number(Number(finCost / 1.15) * 0.02)) //ItemQs *
      .toFixed(2); //price is given by pricItems(unitCost + 15%+Vat) & add 2% withhOld from unitCost
  } else {
    reqData["financeStatus"] = {};
    reqData["financeStatus"]["totalCost"] = Number(ItemQs * procCost);
    reqData["financeStatus"]["witholdTax"] = Number(
      Number(Number(ItemQs * procCost) / 1.15) * 0.02
    ) //ItemQs *
      .toFixed(2); //price is given by pricItems(unitCost + 15%+Vat) & add 2% withhOld from unitCost
  }

  if (
    !nul.includes(reqData["supplier"][0]["paymentMethod"]) &&
    reqData["supplier"][0]["paymentMethod"] === "credit"
  ) {
    reqData["tQCr"] = Number(Number(ItemQs * procCost)).toFixed(2);
  } else {
    reqData["tQCp"] = Number(Number(ItemQs * procCost)).toFixed(2);
  }

  reqData["tQCwzh"] = ((Number(ItemQs * procCost) / 1.15) * 0.02).toFixed(2); //or Just_use [finCost]
  reqData["tQCsvat"] = ((Number(ItemQs * procCost) / 1.15) * 0.15).toFixed(2); //or theprices = 115% * basePrice()... baseis = theprice/115%

  reqData.tQ = Number(ItemQs).toFixed(2);
  reqData.tC = Number(procCost); //holding the unitcost or set_of_unitCost
  reqData.tQC = Number(procCost * ItemQs).toFixed(2);

  //-------------
  var totalTaken = 0;
  var totalOnstore = 0;
  if (
    !nul.includes(reqData["storeStatus"]) &&
    Object.keys(reqData["storeStatus"]).length
  ) {
    totalTaken = nul.includes(Number(reqData["storeStatus"]["taken"]))
      ? 0
      : Number(reqData["storeStatus"]["taken"]); //+ reqData.takenBy[0].quantity
    totalOnstore = nul.includes(reqData["storeStatus"]["Onstore"])
      ? 0
      : Number(reqData["storeStatus"]["Onstore"]); //+ reqData.takenBy[0].quantity
  } else {
    reqData["storeStatus"] = {};
    reqData["storeStatus"]["Onstore"] = ItemQs;
  }

  //---------------------------------==================
  //whilte itemQuanities and stoeStatus.taken is given ( find onStore)
  var takenIndex = {};
  if (
    !nul.includes(reqData["takenBy"]) &&
    reqData["takenBy"].length &&
    totalOnstore > 1
  ) {
    var soldQst = 0;

    for (let ins in reqData["takenBy"]) {
      try {
        takenIndex = nul.includes(reqData["takenBy"][ins])
          ? {}
          : reqData["takenBy"][ins];
      } catch {}

      if (takenIndex["ItemQs"] > totalOnstore) {
        //reqData["takenBy"].pop(); //remove the lastOne
        takenIndex["ItemQs"] = 0;
        soldQst = totalOnstore;
      } else {
        soldQst += nul.includes(takenIndex["ItemQs"])
          ? 0
          : Number(takenIndex["ItemQs"]);
      }
    }

    if (
      !nul.includes(reqData["storeStatus"]) &&
      Object.keys(reqData["storeStatus"]).length
    ) {
      reqData["storeStatus"]["taken"] = soldQst;
      reqData["storeStatus"]["Onstore"] = ItemQs - soldQst;
    }

    totalOnstore = ItemQs - soldQst;
    totalTaken = soldQst;
  }
  {
    reqData["storeStatus"] = {};
    reqData["storeStatus"]["Onstore"] = ItemQs;
    reqData["storeStatus"]["taken"] = 0; }

  //---------------------------------==================
  //whilte itemQuanities and stoeStatus.taken is given ( find onStore)
  //sold..sttus of quantities and total costs...----------------------...saling
  reqData["tQCtvat"] = nul.includes(reqData["tQCtvat"])
    ? 0
    : Number(reqData["tQCtvat"]);
  reqData["tQCtp"] = nul.includes(reqData["tQCtp"])
    ? 0
    : Number(reqData["tQCtp"]);

  var saleIndex = {};
  if (
    !nul.includes(reqData["saleStatus"]) &&
    reqData["saleStatus"].length &&
    totalOnstore > 1
  ) {
    var soldQst = 0;
    var soldPrt = 0;

    for (let ins in reqData["saleStatus"]) {
      try {
        saleIndex = nul.includes(reqData["saleStatus"][ins])
          ? {}
          : reqData["saleStatus"][ins];
      } catch {}

      var soldQs = 0;
      var solduPrice = 0;

      if (saleIndex["ItemQs"] > totalOnstore) {
        //reqData["takenBy"].pop(); //remove the lastOne
        saleIndex["ItemQs"] = 0;
        soldQst = totalOnstore;
        soldQs = 0;
        solduPrice = 0;
      } else {
        soldQs = nul.includes(saleIndex["ItemQs"])
          ? 0
          : Number(saleIndex["ItemQs"]);
        solduPrice = nul.includes(saleIndex["unitPrice"])
          ? 0
          : Number(saleIndex["unitPrice"]);

        soldQst = soldQst + soldQs;
      }

      //reqData["tQt"] = Number(Number(reqData["tQt"]) + soldQs).toFixed(2);
      saleIndex["price"] = soldQs * solduPrice;

      reqData["tQCt"] = Number(
        Number(reqData["tQCt"]) + soldQs * solduPrice
      ).toFixed(2);

      saleIndex["vat"] = Number(solduPrice * soldQs * 0.15).toFixed(2);
      reqData["tQCtvat"] = Number(
        (reqData["tQCtvat"] + Number(solduPrice) * Number(soldQs)) * 0.15
      ).toFixed(2);

      if (saleIndex["paymentMethod"] === "credit") {
        reqData["tQCtr"] = Number(
          Number(reqData["tQCtr"]) + Number(soldQs) * Number(solduPrice)
        ).toFixed(2);
      } else {
        reqData["tQCtp"] = Number(
          Number(reqData["tQCtp"]) + Number(soldQs) * Number(solduPrice)
        ).toFixed(2);
      }
    }

    if (
      !nul.includes(reqData["storeStatus"]) &&
      Object.keys(reqData["storeStatus"]).length
    ) {
      reqData["storeStatus"]["taken"] = soldQst;
      reqData["storeStatus"]["Onstore"] = ItemQs - soldQst;
    }

    totalOnstore = ItemQs - soldQst;
    totalTaken = soldQst;
  } else {
    reqData["saleStatus"] = [];
    reqData["saleStatus"].push({ ItemQs: reqData["ItemQs"], unitPrice: 0 });
    reqData["tQCtp"] = 0;
    reqData["tQCtr"] = 0;
    reqData["tQCtvat"] = 0;
  }

  if (totalTaken > totalOnstore) {
    totalTaken = Number(ItemQs).toFixed(2);
  }
  reqData.tQs = Number(totalOnstore).toFixed(2);
  reqData.tQt = Number(totalTaken).toFixed(2);

  return reqData;
}
//====================  CREATING   ========================
router.post("/good", async (req, res) => {
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
  //-----------------------------=============================dd
  //--------------------------==================================
  const reqDataa = await compGoods(reqData);
  //---------------------------=========================
  try {
    //----------checkfor Duplication
    // Save the new customer to the database
    let Doc = new goodModel(reqDataa);
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

router.put("/good", async (req, res) => {
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
  const reqDataa = await compGoods(reqData);
  //---------------------------===========================================

  try {
    return await goodModel
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
router.get("/goods", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(goodModel, findBy, returnWat, limits);
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
router.get("/good", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(goodModel, findBy, returnWat, limits);
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
router.delete("/good", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(goodModel, reqParams["id"]); //send Id_value only
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
//---------goodModel------------------END

//---------productModel------------------END
async function compProduct(reqData) {
  const _thisDate = new Date();

  var periodResponse = await rOp(
    goodModel,
    { plantName: reqData["plantName"] },
    { updatedAt: 1 },
    1
  );
  
  var _thatDate = new Date();
  if (!nul.includes(periodResponse[0])) {
    nul.includes(periodResponse[0]["updatedAt"])
      ? new Date()
      : periodResponse[0]["updatedAt"];
  }

  let ittakes = ((_thisDate + _thatDate) / 1000) * 60 * 60 * 24;

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

  var procCost = nul.includes(reqData["cost"]) ? 0 : Number(reqData["cost"]); //unit price give as number or set_of_object like below
  var ItemQs = 0; //nul.includes(reqData["ItemQs"]) ? 0 : Number(reqData["ItemQs"]); //unit price give as number or set_of_object like below
  reqData["ItemQs"] = 1;
  //unit price give as number or set_of_object like below
  /*
  if (!nul.includes(reqData["cost"])) {
    var procIns = reqData["cost"];
    var unitCost = nul.includes(procIns["unitCost"])
      ? 0
      : Number(procIns["unitCost"]);
    var importCost = nul.includes(procIns["importCost"])
      ? 0
      : Number(procIns["importCost"]);
    var otherCosts = nul.includes(procIns["otherCosts"])
      ? 0
      : Number(procIns["otherCosts"]);

    procCost = unitCost + importCost + otherCosts;
  }
*/

  let tA = new Date();
  if (!nul.includes(reqData["timeA"])) {
    tA = reqData["timeA"];
  }
  let tB = new Date();
  if (!nul.includes(reqData["timeB"])) {
    tB = reqData["timeB"];
  }

  reqData["productionRate"] = String(
    ((new Date(tB).getTime() - new Date(tA).getTime()) / 1000) * 60 * 60 * 24
  );

  if (!nul.includes(reqData["cylAmount"]) && !nul.includes(reqData["UoM"])) {
    var cylIns = Number(reqData["cylAmount"]);
    var units = reqData["UoM"];
    if (units == "M3" && !nul.includes(reqData["cylPressure"])) {
      var pressure = Number(reqData["cylPressure"]);
      ItemQs = (cylIns * pressure) / 1000;
    } else if (reqData["plantName"] != "Oxygen") {
      ItemQs = cylIns;
    }
  }

  reqData["quantity"] = Number(ItemQs.toFixed(2));

  /*
  var finCost = 0;
  if (!nul.includes(reqData["financeStatus"])) {
    var finIns = reqData["financeStatus"];
    finCost = nul.includes(finIns["totalCost"])
      ? 0
      : Number(finIns["totalCost"]); //unit price give as number or set_of_object like below
    var witholdTax = nul.includes(finIns["witholdTax"])
      ? 0
      : Number(finIns["witholdTax"]); //unit price give as number or set_of_object like below

    finIns["witholdTax"] = (
      witholdTax +
      Number(Number(( finCost) / 1.15) * 0.02) //ItemQs *
    ).toFixed(2); //price is given by pricItems(unitCost + 15%+Vat) & add 2% withhOld from unitCost
  }
    */
  /*
  if (
    !nul.includes(reqData["supplier"]) &&
    reqData["supplier"]["paymentMethod"] === "credit"
  ) {
    reqData["tQCr"] = Number(Number(ItemQs * procCost)).toFixed(2);
  } else {
    reqData["tQCp"] = Number(Number(ItemQs * procCost)).toFixed(2);
  }

  reqData["tQCwzh"] = ((Number(ItemQs * procCost) / 1.15) * 0.02).toFixed(2); //or Just_use [finCost]
  reqData["tQCsvat"] = ((Number(ItemQs * procCost) / 1.15) * 0.15).toFixed(2); //or theprices = 115% * basePrice()... baseis = theprice/115%
  */
  reqData.tQ = Number(reqData["ItemQs"]).toFixed(2);
  reqData.tC = Number(procCost); //holding the unitcost or set_of_unitCost
  reqData.tQC = Number(procCost * ItemQs).toFixed(2);

  ItemQs = reqData["ItemQs"];
  //-------------
  var totalTaken = 0;
  var totalOnstore = 0;
  if (!nul.includes(reqData["storeStatus"])) {
    totalTaken = nul.includes(Number(reqData["storeStatus"]["taken"]))
      ? 0
      : Number(reqData["storeStatus"]["taken"]).toFixed(2); //+ reqData.takenBy[0].quantity
    totalOnstore = nul.includes(reqData["storeStatus"]["Onstore"])
      ? 0
      : Number(reqData["storeStatus"]["Onstore"]).toFixed(2); //+ reqData.takenBy[0].quantity

    if (totalOnstore == 0) {
      reqData["storeStatus"]["Onstore"] = ItemQs;
    }
  } else {
    reqData["storeStatus"] = {};
    reqData["storeStatus"]["Onstore"] = ItemQs;
  }

  //---------------------------------==================
  //whilte itemQuanities and stoeStatus.taken is given ( find onStore)
  //sold..sttus of quantities and total costs...----------------------...saling
  reqData["tQCtvat"] = nul.includes(reqData["tQCtvat"])
    ? 0
    : Number(reqData["tQCtvat"]);
  reqData["tQCtp"] = nul.includes(reqData["tQCtp"])
    ? 0
    : Number(reqData["tQCtp"]); //

  var saleIndex = {};
  if (!nul.includes(reqData["saleStatus"]) && reqData["saleStatus"].length) {
    var soldQst = 0;
    var soldPrt = 0;
    //soldQst = totalOnstore;

    for (let ins in reqData["saleStatus"]) {
      try {
        saleIndex = nul.includes(reqData["saleStatus"][ins])
          ? {}
          : reqData["saleStatus"][ins];
      } catch {}

      var soldQs = 0;
      var solduPrice = 0;
      var Price = 0;

      if (saleIndex["ItemQs"] > totalOnstore) {
        //reqData["takenBy"].pop(); //remove the lastOne
        saleIndex["ItemQs"] = 0;
        soldQst = totalOnstore;
        soldQs = 0;
        solduPrice = 0;
      } else {
        soldQs = nul.includes(saleIndex["ItemQs"])
          ? 0
          : Number(saleIndex["ItemQs"]);

        solduPrice = nul.includes(saleIndex["unitPrice"])
          ? 0
          : Number(saleIndex["unitPrice"]);
        Price = soldQs * solduPrice;
        soldQst = soldQst + soldQs;
      }
      solduPrice = solduPrice * reqData["quantity"]; //
      //reqData["tQt"] = Number(Number(reqData["tQt"]) + soldQs).toFixed(2);
      saleIndex["price"] = soldQs * solduPrice;

      reqData["tQCt"] = Number(
        Number(reqData["tQCt"]) + soldQs * solduPrice
      ).toFixed(2);
      saleIndex["vat"] = Number(solduPrice * soldQs * 0.15).toFixed(2);
      reqData["tQCtvat"] = Number(
        (Number(reqData["tQCtvat"]) + Number(solduPrice) * Number(soldQs)) *
          0.15
      ).toFixed(2);

      if (saleIndex["paymentMethod"] === "credit") {
        reqData["tQCtr"] = Number(
          Number(reqData["tQCtr"]) + Number(soldQs) * Number(solduPrice)
        ).toFixed(2);
      } else {
        reqData["tQCtp"] = Number(
          Number(reqData["tQCtp"]) + Number(soldQs) * Number(solduPrice)
        ).toFixed(2);
      }
    }

    if (
      !nul.includes(reqData["storeStatus"]) &&
      Object.keys(reqData["storeStatus"]).length
    ) {
      reqData["storeStatus"]["taken"] = soldQst;
      reqData["storeStatus"]["Onstore"] = ItemQs - soldQst;
    }

    totalOnstore = ItemQs - soldQst;
    totalTaken = soldQst;
    //reqData["storeStatus"]["taken"] = soldQst;
    //reqData["storeStatus"]["taken"] = soldQst;
  } else {
    reqData["saleStatus"] = [];
    reqData["saleStatus"].push({ ItemQs: 1, unitPrice: 0 });
    reqData["tQCtp"] = 0;
    reqData["tQCtr"] = 0;
    reqData["tQCtvat"] = 0;
  }

  if (totalTaken > totalOnstore) {
    totalTaken = Number(ItemQs).toFixed(2);
    totalOnstore = 0;
  }

  reqData.tQs = totalOnstore;
  reqData.tQt = totalTaken; //will reculculate on sale side

  return reqData;
}

//====================  CREATING   ========================
router.post("/product", async (req, res) => {
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
  //-------------------------------====================================
  var reqDataa = await compProduct(reqData);
  //---------------------------===========================================
  console.log("prodddddddddddddductioooooooooooooooooo", reqDataa);
  try {
    // Save the new customer to the database
    let Doc = new productModel(reqDataa);
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

router.put("/product", async (req, res) => {
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
  //-------------------------------====================================

  //Extracting requestResource...
  const reqDataa = await compProduct(reqData);

  //---------------------------------------======================================
  try {
    return await productModel
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
router.get("/products", async (req, res) => {
  // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  //Extracting requestResource...
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await rOps(productModel, findBy, returnWat, limits);
    ////console.log(response["data"].length, "responseeeeeeee");
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
router.get("/product", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    //const res = await axios.get('https://httpbin.org/get', { [['key','value'],['k','v']] });
    // //const res = await axios.get('https://httpbin.org/get', { {'key','value','k','v'} });
    let response = await rOp(productModel, findBy, returnWat, limits);
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
router.delete("/product", async (req, res) => {
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

  if (!findBy) {
    return res.status(404).send({ message: "paramError" });
  }
  //else{}

  try {
    let response = await dOps(productModel, reqParams["id"]); //send Id_value only
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
//---------productModel------------------END

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


async function _queryParams(params = {},isget=0) {
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
