
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;
import {monpayModel} from  "app/src-ssr/backendCore/models/financeModels"
//---------
var thisModel = monpayModel
let _nullKey={'updatedAt':null}

let createKey='id'
let updateKey='id'
let delKey='id'
const nul = [null, undefined, false, "", [], {}, NaN];


async function createmonpay(reqData,columnOperation =null,columnsubOperation =null){
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

async function updatemonpay (reqData,columnOperation =null,columnsubOperation =null){
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

export {createmonpay,updatemonpay}


async function _primaryOperations(modelQA,reqData) {
  try{
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

  } catch (error) {
    return {status:404,data:error};
}

return {status:200,data:reqData};
}