
const nul = [null, undefined, false, "", [], {}, NaN];


    /*
    for (let dayInx = 0; dayInx < __numDaysofMonth; dayInx++) {
      var isSunday = __thatDate.getDay();
      var presenceDai = "D" + dayInx;
      if (![0, "0"].includes(isSunday)) {
        //it's sundary jump it
        if (reqData[presenceDai] == "1") {
          presenceDay += 1;
        }
      }
    }
    */
    //presenceDay =26

  async function computeattendance(reqData){

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
    
    return reqData
  }

  export default computeattendance