
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;
import {profileModel,threeaModel} from  "app/src-ssr/backendCore/models/profileModels"
import {documentCupdate} from "src-ssr/services/dBServices/documentCupdate.js"
//---------
var thisModel = profileModel
let _nullKey={'updatedAt':null}

let createKey='id'
let updateKey='id'
let delKey='id'
const nul = [null, undefined, false, "", [], {}, NaN];
// SET STORAGE//Where to save

async function createProfile(reqData,columnOperation =null,columnsubOperation =null){
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
                  //-----setting Default Group/Role
                  let newacckey = await threeaModel.findOne({'group':'others'})
                  if(newacckey){modelQA=Object.assign(modelQA,{'acckey':new ObjectId(newacckey.id)})}

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

async function updateProfile (reqData,columnOperation =null,columnsubOperation =null){
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
            //=============S1================Computing Service          // console.log(modelData,'Data-----------------')
            if(columnsubOperation == 'updateRole' && (reqData['group'] ?? false)){
              console.log(`\n == Updating Role & Permission New Group = ${reqData['group'] ?? false}`)
              let newacckey = await threeaModel.findOne({'group':reqData['group']})
              if(newacckey){
                console.log(`\n == Profile Role Updating  acckey = ${newacckey.id ?? null} && RoleGroup =${reqData['group']}`)
                modelQA=Object.assign(modelQA,{'acckey':new ObjectId(newacckey.id)})}
              else{
              console.log(`\n == Updating Role & Permission ;- Creating New Group = ${reqData['group'] ?? false} ; Failed`)
              }
            }else{
                  if(columnOperation){//isRequired Computing Operations
                  computed_ModalQA = await _primaryOperations(modelQA,reqData,columnOperation,columnsubOperation)
                  if(computed_ModalQA.status != 200){return computed_ModalQA}
                  // modelQA=computed_ModalQA.data
                  modelQA=Object.assign(modelQA, computed_ModalQA.data);
                }else{ modelQA=Object.assign(modelQA, reqData);}
            }
          }
          console.log(columnOperation,columnsubOperation,modelQA.acckey,'succeffylly done\n')
          //---------------Computer ModelData
          //=============S2===============Content Weighting Service
          //-----------Saving Model_START
          return  await modelQA.save().then((modelData) => {
            console.log(modelData['acckey'],'Update ===')
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

export {createProfile,updateProfile}


async function _primaryOperations(modelQA,reqData) {
  try{
  //--------------------------------------=============================
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

  var gEarn =0;// - loan
  let taxFreepay = 0;//transport + phone + houseRent;


  if (!nul.includes(reqData.salary)) {

    //---------taxable Computing
    if (!nul.includes(reqData.salary.overTime)) {
      overTime = Number(reqData.salary.overTime);
    }
    if (!nul.includes(reqData.salary.topUp)) {
      topUp = Number(reqData.salary.topUp);
    }
    if (!nul.includes(reqData.salary.grossSalary)) {
      let payableSalary = Number(reqData.salary.grossSalary); /// payableDays;
      grossSalary = Number(payableSalary);
    }

     gEarn = Number(grossSalary + overTime + topUp); // - loan


     reqData["netSalary"] = 0;
     reqData["taxfreeSalary"] = 0;
     reqData["incomeTax"] =0;
     reqData["taxableSalary"] = Number(gEarn).toFixed(2); //reqData['taxableSalary'];// gEarn - inTax - reqData['pension'] - loan;//+ Number(reqData.salary.loan) )

    //--------for tax free_computing
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

      taxFreepay = parseFloat((transport + phone + houseRent).toFixed(2))

      reqData["tQC"] = parseFloat((gEarn + taxFreepay).toFixed(2));
      reqData["taxfreeSalary"]=taxFreepay

    } else {
      reqData["tQC"] = 0;
    }
  }

  if (!nul.includes(reqData.pensionRate)) {
    pensionRate = Number(reqData.pensionRate);
  }


  //console.log(gEarn,'Gearn')

  await computeSalary(gEarn).then((inTax) => {
    //let gEarn = gEarng
    //reqData["incomeTax"] = Number(inTax);
    reqData["pension"] = Number(gEarn * pensionRate);

    var loan = 0;
    if (!nul.includes(reqData.loan)) {
      loan = Number(reqData.loan);
    }

    let totalDeduction = Number(inTax + gEarn * pensionRate + loan);
    reqData["incomeTax"] = Number(inTax).toFixed(2);

    reqData["netSalary"] = Number(gEarn - totalDeduction) + taxFreepay;

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

  reqData['_stage_']=1
  if(!nul.includes(reqData['gmStatus'])){
    reqData['_stage_']=10
  }
 
} catch (error) {
  return {status:404,data:error};
}

return {status:200,data:reqData};
}

async function computeSalary(_earn) {
  var inTax = 0;
  
  //gEarn= salaryExp.grossSalary;//reqData['tQC']
  const gEarn = _earn;
  if (gEarn <= 600) {
    inTax = 0;
  } else if (gEarn > 600 && gEarn <= 1650) {
    inTax = (gEarn * 0.1) - 60;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX1", inTax, gEarn);
  } else if (gEarn > 1650 && gEarn <= 3200) {
    inTax = (gEarn * 0.3) - 142.5;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX2", inTax, gEarn);
  } else if (gEarn > 3200 && gEarn <= 5250) {
    inTax = (gEarn * 0.2) - 302.5;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX3", inTax, gEarn);
  } else if (gEarn > 5250 && gEarn <= 7800) {
    inTax = (gEarn * 0.25) - 565;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX4", inTax, gEarn);
  } else if (gEarn > 7800 && gEarn <= 10900) {
    inTax = (gEarn * 0.3) - 955;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX5", inTax, gEarn);
  } else if (gEarn > 10900) {
    inTax = (gEarn * 0.35) - 1500;
    //console.log("TTTTTTTAAAAAAAAAXXXXXXXXX6", inTax, gEarn);
  }else{inTax=0}
  return inTax;
}

async function computeRoles(_group){

  let accRole = await permi

  return true
}