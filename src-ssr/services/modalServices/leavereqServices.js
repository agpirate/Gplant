
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;
import {leavereqModel} from  "app/src-ssr/backendCore/models/serviceModels"
//---------
var thisModel = leavereqModel
let _nullKey={'updatedAt':null}

let createKey='id'
let updateKey='id'
let delKey='id'
const nul = [null, undefined, false, "", [], {}, NaN];


async function createleavereq(reqData,columnOperation =null,columnsubOperation =null){
    try {
      //------------Preparing finding Query
      let findBy={} //Edit Existing
      if (reqData[createKey] ?? false) {findBy['_'+createKey]=new ObjectId(reqData[createKey]) //updating by id
      }else{ //creatNew  
        findBy=_nullKey //Existing_columns(for Null O/P)
        //return res.status(404).send({ message: "NullData(P) Received." });
      }
      let computed_ModalQA =null

      //-----------finding Record
      return await thisModel
        .findOne(findBy) //findeOne returns:--- Object or null values (while find returns [],[values,....])
        .then(async(modelQA) => { ///if findby is null it returns index_0 item
            // let columnOperation = reqData['onplayOps'] ?? false
            if(modelQA==null){ 
              //==============Computing New Service -001 (for New)
              if(columnOperation){ //isRequired Computing Operations
                   computed_ModalQA = await _primaryOperations({},reqData,columnOperation,columnsubOperation)
                  if(computed_ModalQA.status != 200){return computed_ModalQA}
                  modelQA=new thisModel(computed_ModalQA.data)

              }else{ modelQA = new thisModel(reqData)}           
            }else{
              //==============Computing Existing Service -002 (for Existing)
              if(columnOperation){//isRequired Computing Operations
                let computed_ModalQA = await _primaryOperations(modelQA,reqData,columnOperation,columnsubOperation)
                if(computed_ModalQA.status != 200){return computed_ModalQA}
                // modelQA=computed_ModalQA.data
                modelQA=Object.assign(modelQA, computed_ModalQA.data);
              }else{ modelQA=Object.assign(modelQA, reqData);}
            }
            //--------Computed ModelData
            //=============S2===============Content Weighting Service
            //-----------Saving Model_START    
            return  await modelQA.save().then((modelData) => {
              if (modelData && Object.keys(modelData).length) {
                return { status: 200, data: modelData,foreignData:computed_ModalQA?.foreignData ?? ''}
              } else {return { status: 501, data: modelData}; }
            }).catch((modelError) => {
              return { status: 500, data: modelError}; 
            });
          //-------------------------Saving Model_END
        }).catch((modelQAR)=>{
          return { status:500, data:modelQAR}
        }) //------------
  } catch(error) { return { status: 500, data:error};}
}

async function updateleavereq (reqData,columnOperation =null,columnsubOperation =null){
    try {
      //------------Preparing finding Query
      let findBy={} 
      if (reqData[updateKey] ?? false) {findBy['_'+updateKey]= new ObjectId(reqData[updateKey])//updating by id
      }else{ 
        findBy=_nullKey //Existing_columns(for Null O/P)
        //return res.status(404).send({ message: "NullData(P) Received." });
      }
      //---
      let computed_ModalQA =null
      //-----------finding Record
      return await thisModel
        .findOne(findBy) //if findby is null it returns index_0 item
        .then(async(modelQA) => {
          // let columnOperation = reqData['onplayOps'] ?? true
          if(modelQA==null){ 
             //==============Computing New Service -001 (Only for ExistingRecords)
            return { status: 404, data:" Record Doesn't Found." }
          }else{//----------------Column Computing_I
            //=============S1================Computing Service
            if(columnOperation){//isRequired Computing Operations
               computed_ModalQA = await _primaryOperations(modelQA,reqData,columnOperation,columnsubOperation)
              if(computed_ModalQA.status != 200){return computed_ModalQA}
              // modelQA=computed_ModalQA.data
              modelQA=Object.assign(modelQA, computed_ModalQA.data);
            }else{ modelQA=Object.assign(modelQA, reqData);}
          }
          console.log(columnOperation,columnsubOperation,'succeffylly done')
          //---------------Computer ModelData
          //=============S2===============Content Weighting Service
          //-----------Saving Model_START
          return  await modelQA.save().then((modelData) => {
            // console.log(modelData['quantity'],'Update ===')
            if (modelData && Object.keys(modelData).length) {
              return { status: 200, data: modelData ,foreignData:computed_ModalQA?.foreignData ?? ''}
            } else {return { status: 501, data: modelData}; }
          }).catch((modelError) => {
            return { status: 500, data: modelError}; 
          });
        //-------------------------Saving Model_END
      }).catch((modelQAR)=>{
        return { status:500, data:modelQAR}
      }) //------------
} catch(error) { return { status: 500, data: error};}
}

export {createleavereq,updateleavereq}


async function _primaryOperations(modelQA,reqData) {

  try{
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
  
  } catch (error) {
    return {status:404,data:error};
}

return {status:200,data:reqData};
}