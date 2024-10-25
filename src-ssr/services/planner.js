import {
  planModel,
} from "app/src-ssr/backendCore/models/profileModels";

  import { ref} from "vue"

  const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(null, i , null).toLocaleDateString("en", {
      month: "short",
    }); //short || long
  });
  
  const _thisDate = new Date();
  
  const _thisYear = _thisDate.getFullYear(); //current_year_number
  var _startofthisYear = new Date(_thisYear, 0, 1); //01,01 (Year(startMonth=01(_in_js:0),startDate=01(_in_js:1)))
  var _endofthisYear = new Date(_thisYear, 11, 31); //12,31 (Year(endMonth=12(_in_js:11),endDate=31(_in_js:31)))
  
  var _previouseYear = _thisYear - 1; //previouse_yearnumber
  
  const _thisMonth = _thisDate.getMonth(); //current_month_number
  const _startofthisMonth = new Date(_thisYear, _thisMonth, 1);
  const _endofthisMonth = new Date(_thisYear, _thisMonth + 4, 0);
  
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

var daysPerMList = {}
function getDaysInMonth(month='', year='') {
  var date = new Date(year, month, 1);
  var today = new Date();
  var days = [];
  var all_days = [];
  var endday = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // end date of month
  while (today.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
    
    var d = date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    all_days.push(d);

    daysPerMList[date.getDate().toString().padStart(2, '0')] = {type:'String',default:''}
  }
  return daysPerMList;
}

var reqData ={tQ:1,tC:1,tQC:1,tQs:1,tQCs:1}
reqData ={...reqData, tQCp:1,tQCr:1,tQt:1,tQCt:1,tQCtp:1,tQCtr:1}

var statmentSchema={'goodsIncPd':0,'goodsIncRl':0,'productIncPd':0,'productIncRl':0,'capInc':0,
'purchaseExpPd':0,'purchaseExpRl':0,'monpayExp':0,'mispyaExp':0,'incomeTax':0}

async function planner(instanceP0){

    let returnWat = {tQ:1,tQC:1,tC:1};
    let limits = 100;
    
    try{
                              //-------------expense Computing
    let planns = await rOp(planModel,monthDataFilter,{},{}) 

    return planns
  }catch{}
}
export {planner};


//fetching data of multiple databasess..$

const rOp = async function (dbModel,findBy = {},returnWat = {},limits = 100) {
    //if filtering findBy != {}...
    // { $or: [   { age: 28 }, { age: 1 } ],... }........instead of findBy { key:value,key:value }
    // { age: {{ $in:[ 28, 1] },  },... }........instead of findBy { key:value,key:value }
    
    //console.log("readOperations...", findBy);

    try {
      return await  dbModel
        .find({ $or: [findBy] }, returnWat) //match findBy....if not find return "null"
        .sort({ _id: -1 })
        .limit(limits)
        .then((modelData) => {
          //console.log(modelData,'MMMMMMMMMMMMM')
          if (modelData.length) {
            return modelData ;
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

 var objj={

  tQC:{
    type:Number,
    default: 0,
  },
  tQ:{
    type:Number,
    default: 0,
  },
  tC:{
    type:Number,
    default: 0,
  },
            //--------- dividing the the tQC(values into paid & receivable)
            tQCp:{
              type:Number,
              default: 0,
            },
            tQCr:{
              type:Number,
              default: 0,
            },
    tQCwzh:{ //
        type:Number,
        default: 0,
      },
      tQCsvat:{//
        type:Number,
        default: 0,
      },
            //--------- sold Status( onStore)
  tQs:{ //onstore
    type:Number,
    default: 0,
  },
  tQCs:{ //igonred onStoreQuantities_cost
    type:Number,
    default: 0,
  },
            //---------------
  tQt:{//sold or taken
    type:Number,
    default: 0,
  },
  tQCt:{
    type:Number,
    default: 0,
  },

                //--------- dividing the the tQCt(sold_Quantity)_(values into paid & receivable)
                tQCtp:{
                  type:Number,
                  default: 0,
                },
                tQCtr:{
                  type:Number,
                  default: 0,
                },
            tQCtvat:{//
              type:Number,
              default: 0,
            },
 }

