import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
//import qs from "qs"; //it format any_formated(obj,array) of params into url queriess....when there is params>
//var querystring = require("node:querystring"); //querystring.parse

import { serverAPIURL } from "../../srcenv";
//import { databaseAPI_URL } from "../../config";
import axios from "axios";

//var $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

var API_URL = serverAPIURL+"/procurment"; //var API_URL = `${import.meta.env.API_URL}/users`;
var _model_mainURL="/raw"
var STORE_NAME ="rawStore";

var SETTINGS_LOCAL_STORAGE_KEY = "settings";

var authApi = axios.create({ baseURL: API_URL, timeout: 7000 });

var nul = [null, undefined, false, "", [], {}];

var procApiWrap = {get: request("GET"), post: request("POST"), put: request("PUT"), patch: request("PATCH"), delete: request("DELETE")};

function request(method) {
  return async (url, body = null, paramObj = {}) => {
    var StoreDebug = "Entering Store.."
    paramObj["timestamp"] = new Date().getTime(); //it would generate brand new request..dur the timestamp of new time
    var requestOptions = { method: method,headers: await authHeader(url), params: {}, }; 
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.params = paramObj; //{"id":paramObj["id"],"data":paramObj};  //  build axios_request of => (/get?id:12,headersOpt) or (url,{params:{k:v,},headersOpt)....& pa
    
    StoreDebug = "Store Parameters and Header Setted Up..."

    if (body) {

        let tobeUpload = nul.includes(body.upload) ? false : body.upload  
        if (tobeUpload) {
            requestOptions.headers = { 'Content-Type': 'multipart/form-data' }
            requestOptions.params['upload'] = tobeUpload
         }
      //---------------------------
      try {
        ////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}}  POST/PUT
        StoreDebug = "Store Requesting Setted Up...#"+method
        var response =  method === "POST" ? await authApi.post(url, body, requestOptions) : await authApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        StoreDebug = "Store Showing BackEnd Debug :- ...#"+method+response
        return await respHandler(response).then((HandledRESP) => { return [true, HandledRESP]; }, // Handling Friendly Errors of the response
                                                (error) => {////console.log(StoreDebug)
                                                   return [false,error]; }); // the friendly errors
      } catch (error) {
        StoreDebug = "Request_aborted_OnStore :-Axios_Error "+method+tobeUpload+error
       ////console.log(StoreDebug)
        return [false, error];
      } finally {}

    } else {  
      try {
        StoreDebug = "Store Requesting Setted Up...#"+method
        var response = method === "GET" ? await authApi.get(url, requestOptions) : await authApi.delete(url, requestOptions);
        StoreDebug = "Store Showing BackEnd Debug :- ...#"+method+response
        return await respHandler(response).then((HandledRESP) => { return [true, HandledRESP];  }, // Handling Friendly Errors of the response
                                                (error) => {////console.log(StoreDebug)
                                                  return [false,error]; } ); // the friendly errors
      } catch (error) {
        StoreDebug = "Request_aborted_OnStore :-Axios_Error "+method+tobeUpload+error
        ////console.log(StoreDebug)
        return [false,error];
      } finally {  }
    }
  };
}

async function respHandler(response) {
  ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  try {
    var isJson = response.headers ?.get("content-type")  ?.includes("application/json"); //res.headers['content-type']; :- if application/json(extract json file from res.data)
    let resData = isJson ? response.data : null;
    if (response.statusText === "OK" && resData) { return response['data']; // return all data++Headers
    } else {
      var error = (resData && resData.msg) || response.status;
      if ([401, 403, 404, 505].includes(response.status)) { return Promise.reject("please try again"); // or redirect it to ;- //logout();
      }
      return Promise.reject('Uncoded Status/Data Response Or Non_Json'); // Promis.reject(reason)...brek waiting status with friendly errors handling ( reasonable error given..)
    }
  } catch {  return Promise.reject("Response unHandled Error"); }
}
////((((((((AGGRESIVE ERROR HANDLER))))))))
async function ErrHandle(error) {
  let Error = [];
  var errData = error.response;
  if (errData) {
    Error = [errData.data, errData.status, errData.headers];
  } else if (error.request) {
  } else {
    Error = [error.message];
  }

  return Error;
}
// helper functions
async function authHeader(url) {
  //Inject Header
  var isauthenticated = true; //!!user?.token;
  if (isauthenticated) {
    return {
      Authorization: `Bearer`, // ${user.token}`,
      machine: "client-system",
      location: "mekelle",
      //Date: "12/12/12", //localStorage.getItem('dept'),
    };
  } else {
    return {};
  }
}

///////////////////////
var _thisDate = new Date(); //Tue Dec 26 2023 17:51:01 GMT+0300 (East Africa Time) (as of--- ToDay)
var __thatDate = new Date("12/26/2023, 11:47:20 PM"); //.toLocaleString();getDay()[for days of that week] ;
var _numDaysofMonth = (y, m) => new Date(y, m, 0).getDate(); //given of year# and month#

var _thisYear = _thisDate.getFullYear(); //2023
var _startofthisYear = new Date(_thisYear, 0, 1); //01,01 (Year(startMonth=01(_in_js:0),startDate=01(_in_js:1)))
var _endofthisYear = new Date(_thisYear, 11, 31); //12,31 (Year(endMonth=12(_in_js:11),endDate=31(_in_js:31)))

var _previouseYear = _thisYear - 1; //previouse_yearnumber

var _thisNumMonthOfyear = _thisDate.getMonth(); //11 => NumberOf(Dec)

var _startofthisMonth = new Date(_thisYear, _thisNumMonthOfyear, 1);
var _endofthisMonth = new Date(_thisYear, _thisNumMonthOfyear + 1, 0);
var numDaysofMonth = (y, m) => new Date(y, m, 0).getDate(); //given of year# and month#
/*
var _thisNumDayOfmonth = _thisDate.getDate(); //26 => day# of this month

var _thisNumDayOfWeek = _thisDate.getDay(); //2 => day# of this Week

var getHours = _thisDate.getHours(); //17 => of 17:51:01 ( the time)
var getMinutes = _thisDate.getMinutes(); //51 => of the time
//var getSeconds = _thisDate.getSeconds()(); //01 => of the time
*/
//toLocaleString ( 12/26/2023, 6:10:34 PM)
//toLocaleString('en-us',{month:'short/long', year:'numeric'})
//toLocaleDateString (12/26/2023)
//toDateString(Tue Dec 26 2023)
//toJSON(2023-12-26T15:09:59.598Z)
//toLocaleTimeString ( 6:16:26 PM )

var months = Array.from({ length: 12 }, (e, i) => {
  return new Date(null, i, null).toLocaleDateString("en", {
    month: "short",
  }); //short || long
});

var monthDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _startofthisMonth,
    $lt: _endofthisMonth,
  },
});

var yearDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _startofthisYear,
    $lt: _endofthisYear,
  },
});

//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP

 
export var rawStore = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let DatasParam = ref({});
  let monthDatas = ref({}); //
  //---------------------------
  let loadingStatus = ref(false);
  let syncPeriod = ref(5000);

  var alertI = reactive({ status: false, sms: "" });
  var alertII = reactive({ status: false, sms: "" });

  //getter/ computed
  //var getDatas =ref([])
  var getDatas = computed(() => Datas.value);
  //var getFDatas = computed((filterOps) => Datas.value);
  var getyearDatas = ref({})
 // getyearDatas = computed(() => yearDatas.value);
  var getmonthDatas = computed(() => monthDatas.value);

  //action
  function set_DatasParam(objParams) {
    //set user_controllable alerts
    DatasParam.value = objParams;
    //alertI.sms = message;
    return;
  }

  function set_alertI(logic, message) {
    //set user_controllable alerts
    alertI.status = logic;
    alertI.sms = message;
    return;
  }

  function set_alertII(logic, message) {
    //set user_controllable alerts
    alertII.status = logic;
    alertII.sms = message; //
    return;
  }

  var asyncAnualData = async function (objParam = null) {
    //+++++++++++++++++++...
    loadingStatus.value = true;
    objParam = yearDataFilter.value;
    try {
      return await procApiWrap
        .get(_model_mainURL+"s", null, objParam)
        .then((resp) => {
          if (resp[0]) {
            try {
              let yearlyData = resp[1];
              let monthsData = ref({ 1: [], 2: [],3: [],4: [],5: [], 6: [],7: [],8: [],9: [],10: [],11: [],12: []});
                if(yearlyData.length !== 0 ){
                      for (let items of yearlyData) {
                            let monthIndex = items["updatedAt"].split("/")[0];
                              monthIndex = Number(monthIndex);
                              monthsData.value[monthIndex].push(items);
                            }
                            getyearDatas.value = monthsData.value//computed(() => monthsData.value);
                     }
              return true;
            } catch {return true; }
            } else {  } //Handler Friendly Errors (with Response of Respective_401,501,404)
            return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors

    return false;
  };

  asyncAnualData();

  var asyncMonthData = ''

  let counter = 0;

  var asyncDatas = async (syncState = 60000, reqParams = {}) => {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    syncPeriod.value = syncState;
    if (typeof reqParams != 'object') {
      reqParams = {};
    } 

    let asyncing = setInterval(async () => {
      //////console.log(DatasParam.value,syncPeriod.value,"authStore#asyncDatas New Arrived....YO");
      try {
        return await procApiWrap
          .get(_model_mainURL+"s", null, reqParams)
          .then((resp) => {
            if (resp[0]) {
              let users = resp[1];
              try {
                if (Datas.value.length !== users.length) {
                  ////console.log("_Update Detected...#raw@store",syncPeriod.value)
                  Datas.value = resp[1];
                  counter = 0;
                  syncPeriod.value = 30000;
                  //clearInterval(asyncing);
                  return true;
                } else {
                  ////console.log("No_Update Detected...#raw@store",syncPeriod.value)
                  counter = counter + 1;
                  if (counter === 5) {
                    syncPeriod.value = 20000;
                    syncState = 20000;
                  }
                  return true;
                }
              } catch {return true; }
            } else {  } //Handler Friendly Errors (with Response of Respective_401,501,404)
            return false;
          })
          .catch((error) => { return false;  }); //Handler NonFriendly Errors
      } catch (error) { return true;  } //Handler Supper Non_Friendly Errors
    }, syncPeriod.value); //set it to zero/# to stop/Synchronizing...
  };
  asyncDatas(5000);

  //createDataa
  async function createData(formData = null, objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .post(_model_mainURL, formData, objParam)
        .then((resp) => {
          if (resp[0] && Object.keys(resp[1]).length) {
            try {
              asyncDatas(700);
              return resp;
            } catch {}
          } else {}
          return resp;
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
  }

  //updateData
  async function updateData(formData = null, objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .put(_model_mainURL, formData, objParam)
        .then((resp) => {
         ////console.log('Updating Response',_model_mainURL)
          if (resp[0] && Object.keys(resp[1]).length) {
            try {
              asyncDatas(1000);
              return resp;
            } catch {}
          } else {}
          return resp;
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
   // return false;
  }

  //readData
  async function readData() {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_model_mainURL+"s")
        .then((resp) => {
          if (resp[0] && resp[1].length) {
            try {  return resp[1];
            } catch {}
          } else { } 
          return false;
        }).catch((error) => { return false; }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    return false;
  }

  //readFilterData
  async function readFData(objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_model_mainURL, null, objParam)
        .then((resp) => {
          if (resp[0] && resp[1].length) {
            try {  return resp[1];
            } catch {}
          } else { } 
          return false;
        }).catch((error) => { return false; }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    return false;
  }

  //deleteData
  async function deleteData(objParam) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .delete(_model_mainURL, null, objParam)
        .then((resp) => {
          if (resp[0] && Object.keys(resp[1]).length) {
            try {
              //asyncDatas(1000);
              return resp;
            } catch {}
          } else {}
          return resp;
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
   // return false;
  }
  


  return {
    //-----synchronize give (DATAs)
    asyncAnualData,
    asyncMonthData,
    asyncDatas,
    //------------getter(computed) porting
    getyearDatas,
    getmonthDatas,
    getDatas,
    //------------------set client_controller setting..
    set_DatasParam,
    set_alertI,
    set_alertII,
    //--------------actions porting
    createData,
    readData,
    readFData,
    updateData,
    deleteData,
    //useLogin,
  };
});
