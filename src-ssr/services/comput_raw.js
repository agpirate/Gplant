
const nul = [null, undefined, false, "", [], {}, NaN];
const log_ = (item) => console.log(item+"LOGGGED");



  async function computeRaw(reqData) {
  //object.key-length of number is undefined
  var keyhasValue = (key) => !nul.includes(reqData[key]) && Object.keys(reqData[key]).length != 0 ? true : false; //it_not_number to be checked
  var keyhasValueV = (key) => !nul.includes(reqData[key]) ? true : false; //if_number typed_ field to be checked

    //------------
    var ItemQuantity=1;
    if (keyhasValueV("cylAmount") && keyhasValue("UoM")) {
    //console.log(ItemQuantity,reqData['quantity'],"LOOOOOGING0")
      var cylIns = Number(reqData["cylAmount"]);
      var units = reqData["UoM"];
      if (units == "M3" && !nul.includes(reqData["cylPressure"])) {
        var pressure = Number(reqData["cylPressure"]);
        ItemQuantity = (cylIns * pressure) / 1000; //canging to m3 (the litter)
      } else if (reqData["plantName"] != "Oxygen") {
        ItemQuantity = cylIns;
      }
    //console.log(ItemQuantity,reqData['quantity'],"LOOOOOGING")
    }else{
     ItemQuantity = nul.includes(reqData["quantity"]) ? 1 : Number(reqData["quantity"]); //unit price give as number or set_of_object like below
    }
      
    reqData["quantity"] = (ItemQuantity).toFixed(2);

    //------------preprocess
    reqData = { 
      ...reqData, 
      _stage_:1, //both creator and finance has access
      //--------
      tQ: 0, tC: 0, tQC: 0,tQCp: 0,tQCr: 0,
      //----------
      tQs: 0,
      tQCs: 0
      //---------
    };
    reqData["tQCwzh"] = 0; //with hold on receivable or paid tQCwzh tQCsvat
    reqData["tQCsvat"] = 0; //with hold on receivable or paid tQCwzh tQCsvat
    reqData['Price'] =0
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
    var _stage_ = keyhasValue('_stage_') ? Number(reqData["_stage_"]) : 1 ; //unit price give as number or set_of_object like below

    try{

      //-------------Procurment Stage----Cost Vs Quantity
      var procurmentCost = nul.includes(reqData["cost"]) ? 0 : Number(reqData["cost"]); //unit price give as number or set_of_object like below
      var ItemQs = nul.includes(reqData["ItemQs"]) ? 0 : Number(reqData["ItemQs"]); //unit price give as number or set_of_object like below
      
      //var ItemQuantity = nul.includes(reqData["quantity"]) ? 1 : Number(reqData["quantity"]); //unit price give as number or set_of_object like below

      if ( keyhasValue("cost")) {
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
     
        procurmentCost = unitCost + importCost + otherCosts;
      }
       
     
      //----------------------Finance Releasesing and Auding STAGE_
      var finCost = 0;
      var finwzCost = 0;
     var procurmentCost =nul.includes(procurmentCost) ? 0 : procurmentCost
     
      if (keyhasValue("financeStatus")) { //if ;- is finance object_exits
        var finIns = reqData["financeStatus"];
        finCost = nul.includes(finIns["totalCost"]) ? 0 : (Number(finIns["totalCost"])); //unit price give as number or set_of_object like below
        if(finCost == 0){ 
           finCost = ItemQs * procurmentCost;
           finIns['totalCost'] = finCost
           }
       
       //console.log(reqData["financeStatus"],procurmentCost,finCost,'finance Detected...')
     
        finwzCost= (Number(finCost / 1.15) * 0.02)
     
        finIns["witholdTax"] = (Number(Number(finCost / 1.15) * 0.02)).toFixed(2); //price is given by pricItems(unitCost + 15%+Vat) & add 2% withhOld from unitCost
        //-------------------
        if(!nul.includes(finIns['auditStatus'])){    _stage_ =Math.max(Number(_stage_),2)     }

      } else {
        reqData["financeStatus"] = {}; //if-not ;- Create finance Object
     
        finCost = Number(ItemQs * procurmentCost);
        finwzCost = Number(finCost / 1.15) * 0.02;
     
        reqData["financeStatus"]["totalCost"] = (finCost).toFixed(2)
        reqData["financeStatus"]["witholdTax"] = (finwzCost).toFixed(2); //price is given by pricItems(unitCost + 15%+Vat) & add 2% withhOld from unitCost
     
      }
      
     
      //-----------------------------Stage_None ____procurmet
      if (keyhasValue("supplier")) {
        if (
              !nul.includes(reqData["supplier"][0]["paymentMethod"]) &&
              reqData["supplier"][0]["paymentMethod"] === "credit"
            ) {
              reqData["tQCr"] = (finCost).toFixed(2)
            } else {
              reqData["tQCp"] = (finCost).toFixed(2)
            }
      }
      reqData["tQCwzh"] = (finwzCost).toFixed(2); //or Just_use [finCost]
      reqData["tQCsvat"] = ((finCost / 1.15) * 0.15).toFixed(2); //or theprices = 115% * basePrice()... baseis = theprice/115%..vat_of_Product
      
      
      reqData.tQ = parseFloat((ItemQs).toFixed(2))
      reqData.tC = parseFloat((procurmentCost).toFixed(2)); //holding the unitcost or set_of_unitCost
      reqData.tQC = parseFloat((finCost).toFixed(2));
     
      //-------------
      var totalTaken = 0;
      var totalOnstore = Number(ItemQs);//0;
     
      //---------------------------------==================
      //whilte itemQuanities and stoeStatus.taken is given ( find onStore)
      if (keyhasValue("takenBy")) 
      {
        //console.log("takenby Existed.....$$")
        var takenIndex = {};
     
        var soldQst = 0;
     
        for (let ins in reqData["takenBy"]) {
     
          //--------
          takenIndex = nul.includes(reqData["takenBy"][ins]) || nul.includes(reqData["storeStatus"]['status']) ? {} : reqData["takenBy"][ins];
     
         //---------------
          var itmtotake = nul.includes(takenIndex["ItemQs"]) ? 0 : Number(takenIndex["ItemQs"])
          if (itmtotake > (totalOnstore-soldQst)) {
            itmtotake= Number(totalOnstore-soldQst)
          }
          //------------------
          reqData["takenBy"][ins]["ItemQs"] = parseFloat((itmtotake).toFixed(1));
     
          //-------------------------
          soldQst = Number(soldQst+ itmtotake);
          //-------this is stage 4
        if(itmtotake){  _stage_ =Math.max(Number(_stage_),5)  }

        }
        
        //-----------------
        totalOnstore = totalOnstore - soldQst;
        totalTaken = soldQst;
      }else{
        reqData["takenBy"] =[] //when object is array is coming null ..let the mongodb create default one...that is best
      }
     
      //---------------------------------================== - - t (taken or sold)
      //console.log('saleeeeeeeeeeeeeee2221',keyhasValue("saleStatus"))

      var sold=false
      if (keyhasValue("saleStatus")) {
        var saleIndex = {};
        var soldQst = 0;
        var soldPrt = 0;
        //console.log('saleeeeeeeeeeeeeee222',_stage_)
     
        for (let ins in reqData["saleStatus"]) {
          //----
          saleIndex = nul.includes(reqData["saleStatus"][ins]) || nul.includes(reqData["storeStatus"]['status']) ? {} : reqData["saleStatus"][ins];
          //---------------------
          var itmtotake = nul.includes(saleIndex["ItemQs"]) ? 0 : Number(saleIndex["ItemQs"])
          if (itmtotake > (totalOnstore-soldQst)) {
            itmtotake= totalOnstore-soldQst
          }
          var itmtotakeuprice = nul.includes(saleIndex["unitPrice"]) ? 0 : Number(saleIndex["unitPrice"]) //unit price..including vatZ
          var itmtotakeprice= (itmtotake*ItemQuantity) * itmtotakeuprice
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
          soldQst = soldQst + itmtotake;
          soldPrt = soldPrt + itmtotakeprice;
          //--
          sold=true
          //--
          if(itmtotake){  _stage_ = Math.max(Number(_stage_),5) }
          //_stage_ =Math.max(Number(_stage_),5)
          //console.log('saleeeeeeeeeeeeeee',_stage_)
        }

        try{
          reqData['Price']=parseFloat(Number(reqData["tQCt"]));// + (itmtotakeprice + Number(itmtotakeprice * 0.15)).toFixed(2)
          reqData['customerID']=!nul.includes(reqData["saleStatus"][0]['customerID']) ? reqData["saleStatus"][0]['customerID'] : ' ';// + (itmtotakeprice + Number(itmtotakeprice * 0.15)).toFixed(2)
        }catch{ reqData['customerID'] =' ';reqData['Price'] =0  }

        totalOnstore = totalOnstore - soldQst;
        totalTaken = soldQst;
        //-----
     
      } else {
        reqData["saleStatus"]=[] //when object is array is coming null ..let the mongodb create default one...that is best
        reqData["tQCt"] = 0;
        reqData["tQCtp"] = 0;
        reqData["tQCtr"] = 0;
        reqData["tQCtvat"] = 0;
      }
     
      if (totalTaken > ItemQs) {
        totalOnstore = Number(ItemQs).toFixed(2);//totalOnstore
        totalTaken= 0
      }
     
      //console.log(totalOnstore,totalTaken,'storestatuswwwwwwww')
//console.log(_stage_,reqData['_stage_'])

      if (keyhasValue("storeStatus")) {

          if(!nul.includes(reqData['storeStatus']['status'])){
                   //-------this is stage 3
                  _stage_ =Math.max(Number(_stage_),4)
          }
      }
     else{  
      reqData["storeStatus"]={}    
    }

    if (keyhasValue("quality")) {
      if(!nul.includes(reqData['quality'])){
               //-------this is stage 2
             _stage_ =Math.max(Number(_stage_),3)
      }  }

      reqData["storeStatus"]['Onstore']=parseFloat((totalOnstore).toFixed(2));
      reqData["storeStatus"]['taken'] =parseFloat((totalTaken).toFixed(2));
     
      reqData.tQs = parseFloat((totalOnstore).toFixed(2));
      reqData.tQt = parseFloat((totalTaken).toFixed(2));

    }
    catch(Error){ return false  }
    //----------
    //----------
    //console.log(_stage_,'Stagggggggggggggggggggggggginnnnnnnnnnnnnnnn')
    if(!nul.includes(reqData['gmStatus'])){
      _stage_=10
    }
    reqData['_stage_']=_stage_
    //-------------------
    return reqData;
    
  }
  

  export default computeRaw