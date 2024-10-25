
const nul = [null, undefined, false, "", [], {}, NaN];

async function computSal(_earn) {
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
  
  async function computeEmployee(reqData) {
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
  
    await computSal(gEarn).then((inTax) => {
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
   
    return reqData;
  }

  export default computeEmployee