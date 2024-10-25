
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;
import {rawModel} from  "app/src-ssr/backendCore/models/procurmentModels"
//---------
var thisModel = rawModel
let _nullKey={'updatedAt':null}

let createKey='id'
let updateKey='id'
let delKey='id'

const nul = [null, undefined, false, "", [], {}, NaN];



async function createraw(reqData,columnOperation =null,columnsubOperation =null){
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

async function updateraw (reqData,columnOperation =null,columnsubOperation =null){
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

export {createraw,updateraw}


async function _primaryOperations(modelQA,reqData) {
  const _checkObj = (theKey=null,theValue=null) =>{
    let _doesKeyExisted = reqData[theKey] ?? 0
    let _doesItObject = 0 
    let _doesItArray = 0 
    try{
      if(typeof _doesKeyExisted == 'object'){
        if(Array.isArray(_doesKeyExisted)){
          _doesItArray = _doesKeyExisted ? _doesKeyExisted.length : 0
        }else{
          _doesItObject = _doesKeyExisted ? Object.keys(_doesKeyExisted).length : 0
        }
      }
    }catch{}
    var _thevalue = _doesItObject ? 0:_doesKeyExisted
    return [_doesKeyExisted,_doesItObject,_thevalue,_doesItArray]
    //------reqData['kk'] exist/not, reqData['kk']={k:v_exist},reqData['kk']=v,reqData['kk']=[v_exist]
  }

  try{
     //object.key-length of number is undefined
    //------------
    var quantityMeasured=1;
    if (_checkObj("cylAmount")[2] && _checkObj("UoM")[2]) { //For Product Pricing using Litter or Kg, by UnitPrice
      console.log('\n Resource Quantity is ==== Interm OF Amount_(M3)\n')
      //--------
      var cylIns = Number(reqData["cylAmount"]); ///Container Amount(Size)
      var units = reqData["UoM"];//Measurment of Amount(UoM)
      //1--Litter Measurment------ Container Volume X Pressure Gas = Litters
      if (units == "M3" && (reqData["cylPressure"] ?? false)) {
        var pressure = Number(reqData["cylPressure"]);
        quantityMeasured = (cylIns * pressure) / 1000; //canging to m3 (the litter)
      //-2----- Gas/Solide Mearments
      } else if (reqData["plantName"] != "Oxygen") {
        quantityMeasured = cylIns;
      }else{quantityMeasured = cylIns; }
    }else{
    console.log('\n Resource Quantity is ==== Interm OF quantity\n')
     quantityMeasured = Number(_checkObj('quantity')[2] ==0 ? 1 : _checkObj('quantity')[2])// nul.includes(reqData["quantity"]) ? 1 : Number(reqData["quantity"]); //unit price give as number or set_of_object like below
    }
    reqData["quantity"] = (quantityMeasured).toFixed(2); //Quantity(Basic Mearments.... 40Litter & 5birr = 1Litter)
    console.log(quantityMeasured)
    console.log('Resource Quantity is ====END\n')
    
    //-------Procurment Stage----Cost Vs quantityMeasured(1 x 40Litter Cylinder(1Litter=5birr))
    var procurmentCost = Number(_checkObj('unitCost')[2])//  nul.includes(reqData["cost"]) ? 0 : Number(reqData["cost"]); //unit price give as number or set_of_object like below
    var ItemQuantity = Number(_checkObj('ItemQs')[2]) // nul.includes(reqData["ItemQs"]) ? 0 : Number(reqData["ItemQs"]); //unit price give as number or set_of_object like below
    if(!ItemQuantity){
      {return {status:404,data:"Item Quantity is null"};}
    }
    //------------preprocess
    reqData = { 
      ...reqData, 
      // _stage_:1, //both creator and finance has access
      //--------
      tQ: 0, tC: 0, tQC: 0,tQCp: 0,tQCr: 0,
      //----------
      tQs: 0,
      tQCs: 0
      //---------
    };
    reqData["tQCwzh"] = 0; //with hold on receivable or paid tQCwzh tQCsvat
    reqData["tQCsvat"] = 0; //with hold on receivable or paid tQCwzh tQCsvat
    reqData['sold_Price'] =0 //sold_Quantity
    reqData['sold_Quantity'] =0 //sold_Quantity
    reqData['customerID'] =""

    //-------
    reqData = {
      ...reqData,
      //----------
      tQt: 0,
      tQCt: 0,
      //taken prices(tQCt) (paiable(p) and receiveable(r)) tQCtvat
      tQCtp: 0,
      tQCtr: 0,
    };

    reqData["tQCtvat"] = 0; //with hold on receivable or paid tQCwzh tQCsvat

    //---------Key & Value Existance Checking...
    var _stage_ = Number(_checkObj('_stage_')[2] == 1 ? 2 : _checkObj('_stage_')[2])  // keyhasValue('_stage_') ? Number(reqData["_stage_"]) : 2 ; //unit price give as number or set_of_object like below
    try{

      //var quantityMeasured = nul.includes(reqData["quantity"]) ? 1 : Number(reqData["quantity"]); //unit price give as number or set_of_object like below

      if ( _checkObj("cost")[1]) {
        var procIns = reqData["cost"];
        var unitCost = Number(procIns["unitCost"] ??0)
        var importCost = Number(procIns["importCost"] ??0) 
        var otherCosts = Number(procIns["otherCosts"] ??0)      
        procurmentCost = unitCost + importCost + otherCosts;
      }
       
      if (_checkObj("quality")[2]) { _stage_ =Math.max(Number(_stage_),2)  }

      //----------------------Finance Releasesing and Auding STAGE_
      var ItemQuantityPrice = Number(ItemQuantity * procurmentCost);
      var finwzCost = 0;
      _stage_ = 2
      if (_checkObj("financeStatus")[1]) { //if ;- is finance object_exits
        // financeInstance["witholdTax"] = (finwzCost).toFixed(2); //price is given by pricItems(unitCost + 15%+Vat) & add 2% withhOld from unitCost
        var financeInstance = reqData["financeStatus"];
          //-------------------
        if(financeInstance['auditStatus']?? false){
          if(financeInstance["totalCost"] ?? false){ 
              ItemQuantityPrice = Number(financeInstance["totalCost"]) //unit price give as number or set_of_object like below
             }else{}
         
            finwzCost= (Number(ItemQuantityPrice / 1.15) * 0.02)
          //-----
           _stage_ =3
          }
        console.log('FinanceStatus(Finance)  Buying Price of Procurment====END\n')
      } else {
        reqData["financeStatus"] = {}; //if-not ;- Create finance Object
        finwzCost = Number(ItemQuantityPrice / 1.15) * 0.02;        
        console.log('Procurment(RegAdmin)  Buying Price of Procurment====END\n')
      }
      console.log('Q_price ='+ItemQuantityPrice,'Q_total ='+ItemQuantity,'Q_measurment ='+quantityMeasured,'unit_Price ='+ItemQuantityPrice,'======'+_stage_)
      reqData["financeStatus"]["witholdTax"] = (finwzCost).toFixed(2); //price is given by pricItems(unitCost + 15%+Vat) & add 2% withhOld from unitCost
      reqData["financeStatus"]['totalCost'] = (ItemQuantityPrice).toFixed(2)
      reqData['unitCost']=ItemQuantity ? (ItemQuantityPrice/ItemQuantity).toFixed(2) : 0 //Preventing 0/0(undefine) which is casting_to_Number == NAN
      // reqData['unitCost']=(ItemQuantityPrice/ItemQuantity).toFixed(2)
      //-----------------------------Stage_None ____procurmet

      if (_checkObj("supplier")[3]) {
        let supplierIns = reqData["supplier"]
        if ((supplierIns[0]["paymentMethod"] ?? null) === "credit") {
              reqData["tQCr"] = (ItemQuantityPrice).toFixed(2)
            } else {
              reqData["tQCp"] = (ItemQuantityPrice).toFixed(2)
            }
            console.log('Supplier Information Set tQCr OR tQCp ====END\n')
            console.log(ItemQuantityPrice)
      }
      reqData["tQCwzh"] = (finwzCost).toFixed(2); //or Just_use [ItemQuantityPrice]
      reqData["tQCsvat"] = ((ItemQuantityPrice / 1.15) * 0.15).toFixed(2); //or theprices = 115% * basePrice()... baseis = theprice/115%..vat_of_Product
      
      
      reqData.tQ = parseFloat((ItemQuantity).toFixed(2))
      reqData.tC = parseFloat((ItemQuantityPrice).toFixed(2)); //holding the unitcost or set_of_unitCost
      reqData.tQC = parseFloat((ItemQuantityPrice).toFixed(2));
     
      //-------------
      var totalTaken = 0;
      var totalOnstore = Number(ItemQuantity);//0;
     
      //---------------------------------==================

      if (_checkObj("storeStatus")[1]) {
        console.log('Store Intiated ====START\n')
          if((reqData['storeStatus']['status'] ?? false)){
            console.log('Store Activated(Status Verified) ====\n')
            _stage_=4
            if (_checkObj("takenBy")[3]) 
              {
                var soldQst = 0;
            
                for (let ins in reqData["takenBy"]) {
                  let takenIns = reqData["takenBy"][ins]
                  //--------
                  var itmtotake =Number(takenIns['ItemQs'] ?? 0)// nul.includes(takenIndex["ItemQs"]) ? 0 : Number(takenIndex["ItemQs"])
                  if (itmtotake > (totalOnstore-soldQst)) {
                    itmtotake= totalOnstore > 0 ? totalOnstore  : 0
                  }
                  //------------------
                  reqData["takenBy"][ins]["ItemQs"] = parseFloat((itmtotake).toFixed(1));
             
                  //-------------------------
                  soldQst = Number(soldQst+ itmtotake);
                  //-------this is stage 4
                  totalOnstore = totalOnstore - itmtotake;
                  totalTaken = soldQst;
                }
                if(soldQst){  _stage_ = 5  }
                //-----------------
               console.log('Total_Quantity OnStore && Taken(From_Store) Item is  ====END\n')
               console.log(totalOnstore,totalTaken)
                //-----------------
                let totlaTakenSale =totalTaken
                if (_checkObj("saleStatus")[3] && soldQst) {
                  var saleIndex = {};
                  var soldQs = 0;
                  var soldPrt = 0;
                  //console.log('saleeeeeeeeeeeeeee222',_stage_)
                  
                  for (let ins in reqData["saleStatus"]) {
                    //----
                    saleIndex = reqData["saleStatus"][ins] //nul.includes(reqData["saleStatus"][ins]) || nul.includes(reqData["storeStatus"]['status']) ? {} : reqData["saleStatus"][ins];
                    //---------------------
                    var itmtotake =Number(saleIndex["ItemQs"] ?? 0)// nul.includes(saleIndex["ItemQs"]) ? 0 : Number(saleIndex["ItemQs"])
                    if (itmtotake > (totlaTakenSale-soldQs)) {
                      itmtotake= totlaTakenSale > 0 ? totlaTakenSale : 0
                    }
                    var itmtotakeuprice =Number(saleIndex["unitPrice"] ??0) // nul.includes(saleIndex["unitPrice"]) ? 0 : Number(saleIndex["unitPrice"]) //unit price..including vatZ
                    // var itmtotakeprice= (itmtotake*quantityMeasured) * itmtotakeuprice
                    var itmtotakeprice= (itmtotake) * itmtotakeuprice
                    //---------------- item to take...
                    //-----------------
                    reqData["saleStatus"][ins]["ItemQs"] = parseFloat((itmtotake).toFixed(1));
                    reqData["saleStatus"][ins]["Price"] = parseFloat((itmtotakeprice).toFixed(2))
                    reqData["saleStatus"][ins]["vat"] =  parseFloat(((itmtotakeprice / 1.15) * 0.15).toFixed(2)); //(Number(itmtotakeprice * 0.15)).toFixed(2)
                    reqData["saleStatus"][ins]["prplusVat"] = parseFloat((itmtotakeprice).toFixed(2))
               
                    //-----------Global Data Set
                    reqData["tQCt"] = parseFloat((Number(reqData["tQCt"]) + itmtotakeprice).toFixed(2))   
                    reqData["tQCtvat"] = parseFloat((Number(reqData["tQCtvat"]) + ((itmtotakeprice / 1.15) * 0.15)).toFixed(2))
               
                    if (saleIndex["paymentMethod"] === "credit") {
                      reqData["tQCtr"] = parseFloat((Number(reqData["tQCtr"]) +itmtotakeprice).toFixed(2))
                    } else {  reqData["tQCtp"] = parseFloat((Number(reqData["tQCtp"]) + itmtotakeprice).toFixed(2)); }
                    
                    //---------------
                    soldQs = soldQs + itmtotake;
                    soldPrt = soldPrt + itmtotakeprice;

                    totlaTakenSale = totlaTakenSale -itmtotake
                    //--
                    sold=true
                    //--
                  }
          
                  try{
                    reqData['sold_Price']=parseFloat(Number(reqData["tQCt"]));// + (itmtotakeprice + Number(itmtotakeprice * 0.15)).toFixed(2)
                    reqData['sold_Quantity']=soldQs
                    reqData['customerID']=reqData["saleStatus"][0]['customerID'] ?? ''//!nul.includes(reqData["saleStatus"][0]['customerID']) ? reqData["saleStatus"][0]['customerID'] : ' ';// + (itmtotakeprice + Number(itmtotakeprice * 0.15)).toFixed(2)
                  }catch{ reqData['customerID'] =' ';reqData['sold_Price'] =0  }
          
                  //-----
                  console.log('Total_Quantity OnStore && Taken(From Sales) Item is  ====END\n')
                  console.log(soldQs,soldPrt)
                  
                  if(soldQs ){ 
                      if(totalOnstore){
                        _stage_ = 5
                      }else{
                        _stage_ = 6 
                        if(_checkObj('financeApStatus')[2]){
                          _stage_ = 7                          
                          }
                      }
                      }
                } else {
                  reqData["saleStatus"]=[] //when object is array is coming null ..let the mongodb create default one...that is best
                  reqData["tQCt"] = 0;
                  reqData["tQCtp"] = 0;
                  reqData["tQCtr"] = 0;
                  reqData["tQCtvat"] = 0;
                }
                  //-------this is stage 3
                // _stage_ =Math.max(Number(_stage_),4)
              }else{
                reqData["takenBy"] =[] //when object is array is coming null ..let the mongodb create default one...that is best
              }
              
          }

        console.log('Store Activated ====END\n')
      }
     else{ reqData["storeStatus"]={}}

    reqData["storeStatus"]['Onstore']=parseFloat((totalOnstore).toFixed(2));
    reqData["storeStatus"]['taken'] =parseFloat((totalTaken).toFixed(2));
    
    reqData.tQs = parseFloat((totalOnstore).toFixed(2));
    reqData.tQt = parseFloat((totalTaken).toFixed(2));

    }
    catch(e){ return {status:404,data:e};  }
    //----------
    if(reqData['gmStatus'] ?? false){ _stage_=0}
    //------------
    reqData['_stage_']=_stage_
    //-------------------
  } catch (e) {return {status:404,data:e};}

return {status:200,data:reqData};
}