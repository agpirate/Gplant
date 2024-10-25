import {
  goodModel,
  productModel,
} from "app/src-ssr/backendCore/models/saleModels";

import {
  assetModel,
  rawModel,
} from "app/src-ssr/backendCore/models/procurmentModels";


import {
  statmentModel,
  monpayModel,
  mispayModel,
  //for nam
} from "app/src-ssr/backendCore/models/financeModels";

import { ref } from "vue";


const _thisDate = new Date();

const _thisYear = _thisDate.getFullYear(); //current_year_number
var _startofthisYear = new Date(_thisYear, 0, 1); //01,01 (Year(startMonth=01(_in_js:0),startDate=01(_in_js:1)))
var _endofthisYear = new Date(_thisYear, 11, 31); //12,31 (Year(endMonth=12(_in_js:11),endDate=31(_in_js:31)))

var _previouseYear = _thisYear - 1; //previouse_yearnumber

const _thisMonth = _thisDate.getMonth(); //current_month_number
const _startofthisMonth = new Date(_thisYear, _thisMonth, 1);
const _endofthisMonth = new Date(_thisYear, _thisMonth + 1, 0);

const monthDataFilter = ref({
  //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}

  updatedAt: {
    $gte: _startofthisMonth,
    $lt: _endofthisMonth,
  },
});

const yearDataFilter = ref({
  //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _startofthisYear,
    $lt: _endofthisYear,
  },
});

const nul = ref([undefined, "", null, false, "false", 0, [], {},NaN]);

var daysPerMList = {};


var reqDataMon = { tQ: 1, tC: 1, tQC: 1, tQs: 1, tQCs: 1 };
var reqData = { tQ: 1, tC: 1, tQC: 1, tQs: 1, tQCs: 1 };
reqData = { ...reqData, tQCp: 1, tQCr: 1, tQt: 1, tQCt: 1, tQCtp: 1,tQCtr:1,tQCwzh:1,tQCtvat:1 };

async function statments(instanceP0) {
  var statmentSchema = {
    //--income
    PD_G_Inc: 0, //paid-goods income // tQCtr: 1,tQCwzh:0,tQCtvat:0
    RL_G_Inc: 0, //receiveable goods income
    PD_P_Inc: 0, //paid-product income
    RL_P_Inc: 0, //receivable products income
    
    Cap_Inc: 0, //captical_cont income

    VAT_Inc: 0, //mis expense
    Income:0,
    Expense:0,
    //tax
    incomeTax: 0,//income tax

    //expense
    PD_Exp: 0, //paid 
    RL_Exp: 0, //receivable

    Mon_Exp: 0,//monthly expense
    Mis_Exp: 0, //mis expense

    WIZ_Exp:0,

  };

  let returnWat = { tQ: 1, tQC: 1, tC: 1 };
  let limits = 100;
  var findBy = {};
  //try {
  var periodResponse = await rOp(statmentModel, {}, { updatedAt: 1 }, 1);

  var _thatDate = _thisDate; //periodResponse[0]["updatedAt"];

  if (!nul.value.includes(periodResponse[0])) {
    _thatDate = periodResponse[0]["updatedAt"];
    findBy["updatedAt"] = { $gte: _thatDate };
  } else {
    findBy["updatedAt"] = { $lt: _thisDate };
  }

  //console.log("Last_Statment_Build Date :-", _thatDate);
  //console.log("Now_Statment_Build Date :-", _thisDate);

  //
  return  rOp(assetModel, findBy, reqData, 1000).then(async (assetexp) => {

    statmentSchema["ReportDate"] = _thisDate.toDateString(); // + _thisDate.getFullYear();
    if (!nul.value.includes(assetexp) && assetexp.length > 1) {
      var PD_Exp = 0;
      var RL_Exp = 0;
      //---
      var WIZ_Exp = 0;
      //----income
      var PD_G_Inc = 0;
      var RL_G_Inc = 0;
      //---
      var VAT_Inc = 0;

      assetexp.forEach((item) => {
        //------expense
        PD_Exp = PD_Exp + Number(item["tQC"]);
        RL_Exp = RL_Exp + Number(item["tQCr"]);
        WIZ_Exp = WIZ_Exp + Number(item["tQCwzh"]);
        //----------income
      });
      //console.log(PD_Exp,RL_Exp,WIZ_Exp,"paid;reciebl;- Asset Expense & Incomeee",PD_G_Inc,RL_G_Inc,VAT_Inc)
  
      statmentSchema.RL_Exp =statmentSchema.RL_Exp + RL_Exp;
      statmentSchema.PD_Exp =statmentSchema.PD_Exp +  PD_Exp;
      //----income
      statmentSchema.WIZ_Exp =statmentSchema.WIZ_Exp +  WIZ_Exp;
      statmentSchema.VAT_Inc =statmentSchema.VAT_Inc +  VAT_Inc;
      //----
        //--
       /// statmentSchema.Income =statmentSchema.Income +  (PD_G_Inc+RL_G_Inc);
        statmentSchema.Expense =statmentSchema.Expense +  (RL_Exp+PD_Exp);
   
    }


    return rOp(goodModel, findBy, reqData, 1000).then( async (goodsexp) => {
      if (!nul.value.includes(goodsexp) && goodsexp.length > 1) {
        var PD_Exp = 0;
        var RL_Exp = 0;
        //---
        var WIZ_Exp = 0;
        //----income
        var PD_G_Inc = 0;
        var RL_G_Inc = 0;
        //---
        var VAT_Inc = 0;
  
        goodsexp.forEach((item) => {
          //------expense
          PD_Exp = PD_Exp + Number(item["tQC"]);
          RL_Exp = RL_Exp + Number(item["tQCr"]);
          WIZ_Exp = WIZ_Exp + Number(item["tQCwzh"]);
          //----------income
          PD_G_Inc = PD_G_Inc + Number(item["tQCtp"]);
          RL_G_Inc = RL_G_Inc + Number(item["tQCtr"]);
          VAT_Inc = VAT_Inc + Number(item["tQCtvat"]);
        });
        //console.log(PD_Exp,RL_Exp,WIZ_Exp,"paid;reciebl;- Goodds Expenseee & Incomeee",PD_G_Inc,RL_G_Inc,VAT_Inc)
  
        statmentSchema.RL_Exp =statmentSchema.RL_Exp + RL_Exp;
        statmentSchema.PD_Exp =statmentSchema.PD_Exp +  PD_Exp;
        //-----
        statmentSchema.WIZ_Exp =statmentSchema.WIZ_Exp +  WIZ_Exp;
        statmentSchema.VAT_Inc =statmentSchema.VAT_Inc +  VAT_Inc;

        //----income
        statmentSchema.PD_G_Inc =statmentSchema.PD_G_Inc + PD_G_Inc;
        statmentSchema.RL_G_Inc =statmentSchema.RL_G_Inc + RL_G_Inc;
        //--
          statmentSchema.Income =statmentSchema.Income +  (PD_G_Inc+RL_G_Inc);
          statmentSchema.Expense =statmentSchema.Expense +  (RL_Exp+PD_Exp);
     
      }
  
  

      return rOp(rawModel, findBy, reqData, 1000).then(async (rawsexp) => {
        if (!nul.value.includes(rawsexp) && rawsexp.length > 1) {
          var PD_Exp = 0;
          var RL_Exp = 0;
          //---
          var WIZ_Exp = 0;
          //----income
          var PD_G_Inc = 0;
          var RL_G_Inc = 0;
          //---
          var VAT_Inc = 0;
    
          rawsexp.forEach((item) => {
            //------expense
            PD_Exp = PD_Exp + Number(item["tQC"]);
            RL_Exp = RL_Exp + Number(item["tQCr"]);
            WIZ_Exp = WIZ_Exp + Number(item["tQCwzh"]);
            //----------income
          });
          //console.log(PD_Exp,RL_Exp,WIZ_Exp,"paid;reciebl;- Raw Expense & Incomeee",PD_G_Inc,RL_G_Inc,VAT_Inc)
  
          statmentSchema.RL_Exp =statmentSchema.RL_Exp + RL_Exp;
          statmentSchema.PD_Exp =statmentSchema.PD_Exp +  PD_Exp;
          statmentSchema.WIZ_Exp =statmentSchema.WIZ_Exp +  WIZ_Exp;
          //----income
          //statmentSchema.Income =statmentSchema.Income +  (PD_G_Inc+RL_G_Inc);
          statmentSchema.Expense =statmentSchema.Expense +  (RL_Exp+PD_Exp);
        }
        ////console.log(rawsexp,"Raws Expense")
    
   return rOp(monpayModel, findBy, reqDataMon, 1000).then(async (Mon_Exp) => {

    if (!nul.value.includes(Mon_Exp) && Mon_Exp.length > 1) {
      var Mon_Exp = 0;

      Mon_Exp.forEach((item) => {
        //------expense
        Mon_Exp = Mon_Exp + Number(item["tQC"]);
      });

      statmentSchema.Mon_Exp =statmentSchema.Mon_Exp + Mon_Exp;

              //--
              //statmentSchema.Income =statmentSchema.Income +  (PD_G_Inc+RL_G_Inc);
              statmentSchema.Expense =statmentSchema.Expense +  (Mon_Exp);
         
    }

    //console.log(Mon_Exp,"Monp Expense & Incomeee")
    ////console.log(Mon_Exp,"Monthly Expense")

   return rOp(mispayModel, findBy, reqDataMon, 1000).then(async (mispayexp) => {
    if (!nul.value.includes(mispayexp) && mispayexp.length > 1) {
      var Mis_Exp = 0;


      mispayexp.forEach((item) => {
        //------expense
        Mis_Exp = Mis_Exp + item["tQC"];
      });
      statmentSchema.Mis_Exp = statmentSchema.Mis_Exp + Number(Mis_Exp);

              //--
             // statmentSchema.Income =statmentSchema.Income +  (PD_G_Inc+RL_G_Inc);
              statmentSchema.Expense =statmentSchema.Expense +  (Mis_Exp);
         
    }

      //console.log(Mis_Exp,"Mis Expense & Incomeee")
      ////console.log(mispayexp,"Miscelenouse Expense")

   return rOp(productModel, findBy, reqData, 1000).then(async (productInc) => {
    if (!nul.value.includes(productInc) && productInc.length > 1) {
        var PD_Exp = 0;
        var purchaseExpRdl = 0;
        //---
        var WIZ_Exp = 0;
        //----income
        var PD_P_Inc = 0;
        var RL_P_Inc = 0;
        //---
        var VAT_Inc = 0;
  
        productInc.forEach((item) => {
          //------expense
          //----------income
          PD_P_Inc = PD_P_Inc + Number(item["tQCtp"]);
          RL_P_Inc = RL_P_Inc + Number(item["tQCtr"]);
          VAT_Inc = VAT_Inc + Number(item["tQCtvat"]);
        });
        //console.log(PD_Exp,purchaseExpRdl,WIZ_Exp,"paid;reciebl;- Productt Expense & Incomeee",productInc,PD_P_Inc,RL_P_Inc,VAT_Inc)

        //----income
        statmentSchema.PD_P_Inc =statmentSchema.PD_P_Inc + PD_P_Inc;
        statmentSchema.RL_P_Inc =statmentSchema.RL_P_Inc + RL_P_Inc;
        statmentSchema.VAT_Inc =statmentSchema.VAT_Inc +  VAT_Inc;

                     //--
              statmentSchema.Income =statmentSchema.Income +  (PD_P_Inc+RL_P_Inc);
            // statmentSchema.Expense =statmentSchema.Expense +  (Mis_Exp);
       

      }

    ////console.log(Mis_Exp,"Mis Expense & Incomeee",PD_P_Inc,RL_P_Inc)
    
    statmentSchema.Expense =- statmentSchema.Expense
    statmentSchema["ReportDate"] = _thisDate.toDateString(); // + _thisDate.getFullYear();

    return statmentSchema;
  });
  
  });
  
  });
      
      });

    });

  
  });


}

async function monthlyexpense(instanceP0) {
  let returnWat = { tQ: 1, tQC: 1, tC: 1 };
  let limits = 100;

  //.... doing data manipulating for mongoodb
  let findBy = {};
  findBy["updatedAt"] = { $gte: instanceP0, $lt: _thisMonth };

  let assetexp = await rOp(assetModel, findBy, returnWat, limits);
  let goodsexp = await rOp(goodModel, findBy, returnWat, limits);
  let rawsexp = await rOp(rawModel, findBy, returnWat, limits);

  const exp_ass = Object.values(assetexp);
  const exp_goo = Object.values(goodsexp);
  const exp_raw = Object.values(rawsexp);
  const expenses = [exp_ass, exp_goo, exp_raw];

  var purchaseExpense = { asset: 0, goods: 0, raws: 0 };
  for (let ex in expenses) {
    let array = expenses[ex];
    let sum = 0;
    array.forEach((el) => (sum += el));
    //console.log(sum);

    purchaseExpense[array.name] = sum;
  }

  return purchaseExpense;
}

export { statments, monthlyexpense };

//fetching data of multiple databasess..$

const rOp = async function (
  dbModel,
  findBy = {},
  returnWat = {},
  limits = 1000
) {

  try {
    return await dbModel
      .find({ $or: [findBy] }, returnWat) //match findBy....if not find return "null"
      .sort({ _id: -1 })
      .limit(limits)
      .then((modelData) => {
        //console.log("readService API fired to search items", limits);
        if (modelData.length) {
          return modelData;
        } else {
          //console.log(modelData, "  <<===== Error Occured");
          return { status: 404, error: "No Record Founded" + modelData };
        }
        //{first} :- [filterBy]  ;- [second} :- [returning columns],... function_3 (callback/response handler when O/p is coming)
      })
      .catch((modelError) => {
        return {
          status: 404,
          error: "Fatal Error on Mongod server ? i think" + modelError,
        };
      }); // return modelError
  } catch (error) {
    return { status: 505, error: "Server Error" + error };
  }
};


