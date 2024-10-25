
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;
import {attendModel} from  "app/src-ssr/backendCore/models/serviceModels"
//---------
var thisModel = attendModel
let _nullKey={'updatedAt':null}

let createKey='id'
let updateKey='id'
let delKey='id'
const nul = [null, undefined, false, "", [], {}, NaN];


async function createattend(reqData,columnOperation =null,columnsubOperation =null){
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

async function updateattend (reqData,columnOperation =null,columnsubOperation =null){
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

export {createattend,updateattend}


async function _primaryOperations(modelQA,reqData) {
  try{
  let _thatDate = nul.includes(reqData["updatedAt"]) ? new Date() : reqData["updatedAt"]; //take today or thatDay
  let __thatDate = new Date(_thatDate);
  let __thatYear = __thatDate.getFullYear();
  let __thatMonth = __thatDate.getMonth();

  let __numDaysofMonth = new Date(__thatYear, __thatMonth, 0).getDate();

  reqData = { ...reqData, tQ: 0, tC: 0, tQC: 0,attenSalary:0};

  let presenceDay = nul.includes(reqData.presenceDays) ? 26: Number(reqData.presenceDays);
  let paydays = nul.includes(reqData.payDays) ? 26 : Number(reqData.payDays);
  let pension = nul.includes(reqData.pension) ? 0.7 : Number(reqData.pension);
  
  let netSalary = nul.includes(reqData.netSalary) ? 0 : Number(reqData.netSalary); //holding the unitcost or set_of_unitCost
  let attenSalary = nul.includes(reqData.attenSalary) ? 0 : Number(reqData.attenSalary); //holding the unitcost or set_of_unitCost
  let taxfreeSalary = nul.includes(reqData.taxfreeSalary) ? 0 : Number(reqData.taxfreeSalary); //holding the unitcost or set_of_unitCost
  let incomeTax = nul.includes(reqData.incomeTax) ? 0 : Number(reqData.incomeTax); //holding the unitcost or set_of_unitCost

  if (!nul.includes(paydays) && paydays !== 0) {
    try {
      attenSalary = (Number(netSalary) / Number(paydays)) * Number(presenceDay);
    } catch {
        attenSalary = 0;
    }

    try {
      pension = (Number(pension) / Number(paydays)) *  Number(presenceDay)  
    } catch {
      pension = 0;
    }

    try {
      incomeTax = (Number(incomeTax)/ Number(paydays)) * Number(presenceDay) ;
    } catch {
      incomeTax = 0;
    }

  }

  reqData.attenSalary = parseFloat((Number(attenSalary) + Number(taxfreeSalary)).toFixed(2));
  reqData.incomeTax = parseFloat((incomeTax).toFixed(2)) ;//Number(reqData.pension) + Number(companyPension); //.toFixed(2);
  reqData.pension = parseFloat((pension).toFixed(2))

  //------------if company_pensions is
  let companyPension = netSalary * 0.11;

  reqData["tQC"] = Number(reqData.netSalary + companyPension);//.toFixed(2); //is not required..

  reqData.netSalary = netSalary
  //---------------
  reqData['presenceDays'] = presenceDay
  reqData['payDays'] = paydays

  //------
  reqData.tQ = presenceDay;
  reqData.tC = netSalary; //holding the unitcost or set_of_unitCost
  
} catch (error) {
  return {status:404,data:error};
}

return {status:200,data:reqData};

}