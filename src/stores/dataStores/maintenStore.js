import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import axios from "axios";
import { useLocalStorage,useSessionStorage } from "@vueuse/core"
import { toRaw } from 'vue'

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/
const API_URL = process.env.API_IP_PORT+"/services"; //const API_URL = `${import.meta.env.API_URL}/users`;
const modalApi = axios.create({ baseURL: API_URL, timeout: 7000 });
const procApiWrap = {get: request("GET"), post: request("POST"), put: request("PUT"), patch: request("PATCH"), delete: request("DELETE")};

const _model_mainURL="/mainten"
const STORE_NAME ="maintenStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

async function _gettime (){  return new Date() }

function request(method) {
  return async (url, body = null, paramObj = {}) => {
    let _modelName =url.split('/')[1]
    var requestOptions = { method: method,headers: await requestHeader(_modelName), params:paramObj };
    requestOptions.headers['Content-Type'] ="application/json"; 
    requestOptions.params["timestamp"]  = await _gettime();
    //console.log(requestOptions,'thisclirequestOps')

    if (body != null) {
        let fileObject = body['file_'] ?? false 
        if (fileObject) {
            var _formData = new FormData()
            requestOptions.headers['Content-Type'] ="multipart/form-data"// {'Content-Type':"multipart/form-data"}
            requestOptions.params['file_'] = fileObject //holding the fileName as file:__ or files:___
            //------------
            //let file_ = [fileObject['file'] ?? null,fileObject['files'] ?? null]
            for(let key in body){ //if there is file_data duplicate all data into formData(format)...since file uploading is better as formData
                if(Object.values(fileObject).includes(key)){    //Detect the fileAsRaw file(actuall file key_)
                      //-----------------------
                    if(fileObject['files'] ?? false){//is arrayed files
                      for(let kkey in body[key]){    //if fileAsRaw is array(multiple file support)
                       _formData.append(key,body[key][kkey])
                      }
                    }
                    else if(fileObject['file']){//is single file 
                      _formData.append(key,body[key][0])
                    }else{return false}
                  //---------------
                }else{//and nonFile Columns
                      if(typeof body[key] != 'object'){ //it's hard to send object([]-{}) _ sending file_won't involve_object_data
                        _formData.append(key,body[key])  //and object(array specially has to be defined manually)
                      }
                  }
            }
            body=_formData
         }
      //---------------------------////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT
      try {
        const response =  method === "POST" ? await modalApi.post(url, body, requestOptions) : await modalApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        return await responseHandler(response).then((HandledRESP) => { return{status:true,data:HandledRESP} }, // Handling Friendly Errors of the response
                                                (error) => {console.log(error);return {status:false,data:error}})
                                              .catch((error)=>{console.log(error);return {status:false,data:error}})
      } catch (error) {
        console.log('API Response Error',error)
        return {status:false,data:error};
      } 

    } else {  
      try {
        const response = method === "GET" ? await modalApi.get(url, requestOptions) : await modalApi.delete(url, requestOptions);
        return await responseHandler(response).then((HandledRESP) => { return{status:true,data:HandledRESP} }, // Handling Friendly Errors of the response
                                                  (error) => {console.log(error);return {status:false,data:error}}) // the friendly errors
                                                  .catch((error)=>{console.log(error);return {status:false,data:error}})
      } catch (error) {
        console.log('API Response Error',error)
        return {status:false,data:error};
      } 
    }
  };
}

//Res
let _okStatus =[200]//201,202] //
let _serviceStatus =[400,401,402,403,404,405,300,303] //
let _serverokStatus =[500,501,502,503,504,505] //
async function responseHandler(response) { ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  console.log(response,"Response Data")
  try {
      if (_okStatus.includes(response.status ?? false) && (response.data ?? false)) { 
        try{response.data = JSON.parse(response.data) ?? response.data}catch{}
        const contentType = response.headers.get('Content-Type');
        const isJson = contentType.includes('application/json') //if application/json(extract json file from res.data)        
         if(isJson){
         //------
         //----------------------------------
         // setDHeaders(_setHeader)  
         //---------
         return response.data
         }
       } 
      return Promise.reject(response)
  } catch(e) {return Promise.reject(e)}
}

////((((((((AGGRESIVE ERROR HANDLER))))))))
async function ErrorHandler(error) {
  let Error = [];
  const errData = error.response;
  if (errData) {
    Error = [errData.data, errData.status, errData.headers];
  } else if (error.request) {
  } else {
    Error = [error.message];
  }

  return Error;
}
//--------------------------------------------Helpers
//--------------------------------------------Helpers
async function requestHeader(_model='') {
  //Inject Header
  var _reqHeaders = {}//_reqHeader.value ?? {}
  _reqHeaders['Test']='WooW'
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
  _reqHeaders['_issModal']=_model

  let _geolat = toRaw(useLocalStorage('geo.lat').value ?? false)
  let _geolong = toRaw(useLocalStorage('geo.long').value ?? false)
  if(_geolat){
    _reqHeaders['geo.lat']=_geolat
    _reqHeaders['geo.long']=_geolong
  }

  return _reqHeaders ?? {};
}

//-------------TimeBase Query_Helper
import { _getthismonth,_getthisyear,monthDataFilter,yearDataFilter } from "src/services/timeQuery";


//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
export const maintenStore = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let status_Rows = ref('');
  let syncLock = ref(false);
  let syncQuery = ref({});

  let yearDatas = ref({});
  let yearsyncQuery = ref({}); //
  let monthDatas = ref({}); //
  let monthsyncQuery = ref({}); //
  //---------------------------
  let loadingStatus = ref(false);
  let syncPeriod = ref(5000);

  let logHeaders = ref(null);

  const alertI = reactive({ status: false, sms: "" });
  const alertII = reactive({ status: false, sms: "" });

  //getter/ computed
  const getDatas = computed(() => Datas.value  );
  const getstatus_Rows = computed(() => status_Rows.value );

  const getyearDatas = computed(() => yearDatas.value);
  const getmonthDatas = computed(() => monthDatas.value);
  const getloadingStatus = computed(() => loadingStatus.value);

//action

async function set_syncQuery(objParams) {
    status_Rows.value='Loading...' //for new Searching set status ='loading'
    syncQuery.value = objParams;
    return true;
  }
async function set_syncLock(locker) {
    syncLock.value = locker;
    return true;
  }

let _newsChecker = {}
async function asyncDatas ()  { 
       //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
       if(syncLock.value){ // Allow(false) or Block(true) Syncing
          status_Rows.value=true;
          return true
        }
        console.log('syncing'+STORE_NAME,syncQuery.value)
        let paramObj = Object.assign({},syncQuery.value)
        paramObj["timestamp"] =  toRaw(await _gettime()); //timestamp create New Request & but could create autonomouse requests(due_ seconds updating ?)
        var requestOptions = {method:'GET',headers: await requestHeader(), params: {}, }; 
        requestOptions.headers["Content-Type"] = "application/json"; //The MIME type of the body of the request (used with POST and PUT requests)
        requestOptions.params = paramObj; //{"id":paramObj["id"],"data":paramObj}; //  build axios_request of => (/get?id:12,headersOpt) or (url,{params:{k:v,},headersOpt)....& pa
        
        try {
          return await modalApi.get(API_URL+_model_mainURL,requestOptions).then((response)=>{
            if(response.status == 200) //array_Value Existed
            { 
              // let _diff = Datas.value[0] != response.data[0] //has different in numbers
              if (response.data.length ?? false ){//|| (Datas.value[0].updatedAt!== _respData[0].updatedAt)){//if has lengthDifference or firstIndex_Different push it
                let _diff = Datas.value.length  - response.data.length //has different in numbers
                if(_diff){
                    Datas.value = response.data;
                    status_Rows.value= true
                    return true
                }
                else if(status_Rows.value != false){status_Rows.value=false } //incoming same data

              } else if(status_Rows.value != null) {status_Rows.value=null} //no result
            }
            else {status_Rows.value='Error Connection'} //no result
            return true
          }).catch((error)=>{status_Rows.value='Error Connection' ;//null founded
            return true}) 
        } catch (error) { status_Rows.value='Error Connection'}
        return true
  };

  //createDataa
  async function createData(formData = {}, objParam = {}) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .post(_model_mainURL, formData, objParam)
        .then((resp) => {//console.log('creating New profile..',resp)
            return resp
        })
        .catch((error) => {return {status:false,data:''}; }); //Handler NonFriendly Errors
    } catch (error) {return {status:false,data:''}} //Handler Supper Non_Friendly Errors
  }

  //updateData
  async function updateData(formData = {}, objParam = {}) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .put(_model_mainURL, formData, objParam)
        .then((resp) => {
          return resp
        })
        .catch((error) => {return {status:false,data:''}; }); //Handler NonFriendly Errors
    } catch (error) {return {status:false,data:''}} //Handler Supper Non_Friendly Errors
  }

  //readData
  async function readData() {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_model_mainURL+"s")
        .then((resp) => {
          return resp
        })
        .catch((error) => {return {status:false,data:''}; }); //Handler NonFriendly Errors
    } catch (error) {return {status:false,data:''}} //Handler Supper Non_Friendly Errors
  }

  //readFilterData
  async function readFData(objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_model_mainURL,null, objParam)
        .then((resp) => {
          return resp
        })
        .catch((error) => {return {status:false,data:''}; }); //Handler NonFriendly Errors
    } catch (error) {return {status:false,data:''}} //Handler Supper Non_Friendly Errors
  }

  //deleteData
  async function deleteData(objParam) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .delete(_model_mainURL, null, objParam)
        .then((resp) => {
          return resp
        })
        .catch((error) => {return {status:false,data:''}; }); //Handler NonFriendly Errors
    } catch (error) {return {status:false,data:''}} //Handler Supper Non_Friendly Errors
  }
  




  //----------------------------------
  const asyncAnualData = async function (objParam = null) {
    //+++++++++++++++++++...
    loadingStatus.value = true;
    objParam = yearDataFilter.value;
    try {
      return await procApiWrap
        .get(_suburl+"s", null, objParam)
        .then((resp) => {
          if (resp.status) {
            try {
              let yearlyData = resp.data;
              let monthsData = { 1: [], 2: [],3: [],4: [],5: [], 6: [],7: [],8: [],9: [],10: [],11: [],12: []};
              for (let items of yearlyData) {
                try{
                  let monthIndex = Number(items["createdAt"].split("-")[1]);
                  monthsData[monthIndex].push(items);
                }catch(e){console.log(e,"Failed") }
              }
              yearDatas.value = monthsData; //{'apr':[{},{}],'jun':[{},{}]}
              return true;
            } catch {}
          } else {
            //returns.......data [False,'Error...']
          } //Handler Friendly Errors (with Response of Respective_401,501,404)
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors

    return false;
  };

  asyncAnualData();

  const asyncMonthData = async function (objParam = null) {
    //+++++++++++++++++++...
    loadingStatus.value = true;
    objParam = monthDataFilter.value;

    try {
      return await procApiWrap
        .get(_suburl, null, objParam)
        .then((resp) => {
          if (resp[0]) {
            try {
              let monthData = resp[1]["data"];
              let monthsData = {1: [],2: [],3: [],
                4: [],5: [],6: [],7: [],8: [],
                9: [],10: [],11: [],12: [],};
              for (let items of monthData) {
                let monthIndex = items["createdAt"].split("-")[1];
                monthIndex = Number(monthIndex);

                monthsData[monthIndex].push(items);
              }
              monthDatas.value = monthsData; //{'apr':[{},{}],'jun':[{},{}]}
              ////////console.log(yearDatas.value,'uuuuuuuuuuuuuuuuuuuuuuuu')
              return true;
            } catch {}
          } else {
            //returns.......data [False,'Error...']
          } //Handler Friendly Errors (with Response of Respective_401,501,404)
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors

    return false;
  };
  return {
    //-----synchronize give (DATAs)
    asyncAnualData,
    asyncMonthData,
    asyncDatas,
    //------------getter(computed) porting
    getyearDatas,
    getmonthDatas,
    getDatas,
    status_Rows,
    getstatus_Rows,
    Datas,
    //------------------set client_controller setting..
    set_syncQuery,
    set_syncLock,
    //set_alertI,
    //set_alertII,
    //--------------actions porting
    createData,
    readData,
    readFData,
    updateData,
    deleteData,
    //useLogin,
  };
});
