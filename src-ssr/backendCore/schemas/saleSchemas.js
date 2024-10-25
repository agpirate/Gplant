var today = () => new Date();//.toLocaleDateString();//.split("T")[0];
const nul = [null, undefined, false, "", [], {}];
const acceType=['root','regAdmin','columnPower']
import { mongoose } from "mongoose";
import { ref } from "vue";
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;
//------------------------Finance_chema Ends

//---------------------------Procurment_Schema Ends

//----------------------Human Resource _Schema Ends.....

//-------------------Employee Profile and Meta Edns

const customerSchema = 
{
  _stage_: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,

  },
  customerID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  customerName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  cylinders: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  customerOF: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Oxygen", "Acetylene", "CarbonDioxyed","N2(gas)","N2(liquid)","Co2_O2","++_O2"],
  },
  customerBankAccount: {
    accountNumber: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    bankName: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
  },
  customerTIN: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  /*productRequest: [{
    productType: {
      type: String,vtype:"String",default:"",:"",
      enum: ["","Oxygen", "Carbondioxide", "Accetylene"],
    },
    unitPrice: {
      type:Number,default:0,:0,
    },
    totalQuantity: {
      type:Number,default:0,$:0,
    },
    totalCost: {
      type:Number,default:0,$:0,
    },
    paymentMethod: {
      type: String,vtype:"String",default:"",$:"",
      enum: ["","cash", "bank", "check", "credit"],
    },
    date: { type: Date,vtype:"Date", default: today },
  }],*/
  feedback: {
    buyFrequency: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
      enum: ["", "high", "medium", "low"],
    },
    takesCredit: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
      enum: ["", "Yes", "No"],
    },

    payOnTime: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
      enum: ["", "yes", "medium", "no"],
    },
    orderClearing: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
      enum: ["", "high", "medium", "low"],
    },
  },
  rateit: {
    //re-admissions every months....
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "AAA", "AA", "A", "B", "C"],
  },
  notes: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    textarea: true,

  },
  reminderDays: {
    type: Number,vtype:"Number",
    default: "",
    $ifNull: "",
  },
  address: {
    woreda: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    city: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    phone: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    email: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
  },
  socielMedia: {
    faceBook: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    telegram: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    imo: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    linkedIn: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
  },
  userID: {
    type: String,vtype:"String",
    default: "",
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
  //-----------------------
  tQ: {
    //qunatities he/she boughts
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  tQC: {
    //amount he boughts in birr
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
}

const goodsSchema = 
{
  _stage_: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,

  },
  goodsName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  plantgoods: {
    type: String,vtype:"String",
    default: "Oxygen",
    $ifNull: "Oxygen",
    enum: ["", "Acetylene", "Oxygen","Co2","reuseable", "Facilities"],
  },
  unitCost: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  cylSerial: {
    type: String,vtype:"String",
    default: "xxxxxxx",
    index: { unique: true, dropDups: true },
  },
  tags: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  ItemQs: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,
  },
  UoM: {
    type: String,vtype:"String",
    default: "M3",
    $ifNull: "",
    enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
  },
  supplier:[  {
      paymentMethod: {
        type: String,vtype:"String",
         default: "bank",
         enum: ["", "cash", "bank", "check", "credit"],
       },
      receiptNo: {
        type: String,vtype:"String",
         default: "",
       },
      supplierID: {
       type: String,vtype:"String",
        default: "",
        ref:"supplier"
      },
    },
  ],
  /*
  [{
      paymentMethod: {
      type: String,vtype:"String",default:"",$ifNull:"",,
      enum: ["","cash", "bank", "check", "credit"],
    },
      receiptNo: {
      type:String,default:'',
    },
    supplierID: {
      type:"",
      ref:"suppliers",default:null
    }
}],
    */
  qualityStatus: {
    type: String,vtype:"String",
    default: "qualified",
    $ifNull: "qualified",
    enum: ["", "qualified", "discarded", "lowQuality"],
  },
  financeStatus: {
    totalCost: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    auditStatus: {
      type: String,vtype:"String",
      enum: ["", "Verfied"],
      default: "",
    },
    witholdTax: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    receiptNo: {
      type: String,vtype:"String",
      default: "",
    },
    date: { type: Date,vtype:"Date", default: today },
  },
  storeStatus: {
    Onstore: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    taken: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    status: {
      type: String,vtype:"String",
      default: "",
      enum: ["", "Vr"],
    },
  },
  sold_Price: {
    type: Number,vtype:"Number",
    default: 0, ///
  },
  sold_Quantity: {
    type: Number,vtype:"Number",
    default: 0, ///
  },
  customerID: {
    type: String,vtype:"String",
    default: "", ///
  },
  takenBy:[ {
    userID: {
     type: String,vtype:"String",
      default: "",
    },
    takenID: {
     type: String,vtype:"String",
      default: "",
    },
    ItemQs: {
     type: Number,vtype:"Number",
      default: 0,
    },
    state: {
     type: String,vtype:"String",
      default: "",
      enum: [ "new", "damaged", "used"],
    },
    //date: {type: Date, default: todday },
  }],
  saleStatus:[  {
        //form of sale
        customerID: {
          type: String,vtype:"String",
          default: "",
        },
        unitPrice: {
         type: Number,vtype:"Number",
          default: 0,
        },
        ItemQs: {
         type: Number,vtype:"Number",
          default: 0,
        },
        Price: {
          type: Number,vtype:"Number",
           default: 0,
         },
        paymentMethod: {
         type: String,vtype:"String",
          default: "bank",
          enum: [ "","cash", "bank", "check", "credit"],
        },
        receiptNo: {
         type: String,vtype:"String",
          default: "",
        },
        vat: {
          type: Number,vtype:"Number",
           default: 0,
         },
         prplusVat:{
          type: Number,vtype:"Number",
           default: 0,
         },
        
      }
    ],
  financeApStatus:{
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Finance Approve"],
  },
  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"], ///
  },
  userID: {
    type: String,vtype:"String",
    default: "",
  },

  //---------------INVISIBLE Columns
  //------------ procurment side computing the Quantity , unitCost(setof) and total Cost
  tQC: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQ: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tC: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  //--------- dividing the the tQC(values into paid & receivable)
  tQCp: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCr: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCwzh: {
    //
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCsvat: {
    //
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  //--------- sold Status( onStore)
  tQs: {
    //onstore
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCs: {
    //igonred onStoreQuantities_cost
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  //---------------
  tQt: {
    //sold or taken
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCt: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  //--------- dividing the the tQCt(sold_Quantity)_(values into paid & receivable)
  tQCtp: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCtr: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCtvat: {
    //
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
}

const productSchema = 
{
  _stage_: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,

  },
  productName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Oxygen", "Carbondioxide", "Acetylene", "Aceton","N2(L)","N2(G)"],
  },
  UoM: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
 enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
  },
  cylSerial: {
    type: String,vtype:"String",
    default: "xxxxxxx",

    $ifNull: 0,
    index: { unique: true, dropDups: true },
  },

  cylinderStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "painted", "tested", "normal", "suspicious"],
  },
  cylAmount: {
    //
    type: Number,vtype:"Number",
    default: 40.5,
    $ifNull: 40.5,
  },
  cylPressure: {
    type: Number,vtype:"Number",
    default: 150,
    $ifNull: 150,
  },
  ItemQs: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,
  },
  quantity: {
    //interms of measurments units
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,
  },
  unitCost: {
    //of unitVolums(m3) ; unit(killo) ; unit(litter)
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  customerID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  cylinderOwner: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Ours", "Customer's"],
  },
  receivedTime: {
    //for engineers(Registration admin)of goods upto delivering to store ( not for noncylProducts)
    type: Date,vtype:"Date",
    default: new Date(),
    $ifNull: new Date(),
  },
  DeliveredTime: {
    type: Date,vtype:"Date",
    default: new Date(),
    $ifNull: new Date(),
  },

  productionRate: {
    //interm of the timetaken to fill cyl from the time it withdrawn or ordered
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  tags: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  userID: {
    type: String,vtype:"String",
    default: "",
  },
  storeStatus: {
    Onstore: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    taken: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    status: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
      enum: ["", "Vr"],
    },
  },
  takenBy:[ {
    userID: {
     type: String,vtype:"String",
      default: "",
    },
    takenID: {
     type: String,vtype:"String",
      default: "",
    },
    ItemQs: {
     type: Number,vtype:"Number",
      default: 0,
    },
    state: {
     type: String,vtype:"String",
      default: "",
      enum: [ "new", "damaged", "used"],
    },
    //date: {type: Date, default: todday },
  }],
  saleStatus: [      {
        //form of sale
        customerID: {
          type: String,vtype:"String",
          default: "",
        },
        unitPrice: {
         type: Number,vtype:"Number",
          default: 0,
        },
        ItemQs: {
         type: Number,vtype:"Number",
          default: 0,
        },
        Price: {
          type: Number,vtype:"Number",
           default: 0,
         },
        paymentMethod: {
         type: String,vtype:"String",
          default: "cash",
          enum: [ "","cash", "bank", "check", "credit"],
        },
        receiptNo: {
         type: String,vtype:"String",
          default: "",
        },
        vat: {
          type: Number,vtype:"Number",
           default: 0,
         },
         prplusVat:{
          type: Number,vtype:"Number",
           default: 0,
         },
        
      }
    ],

  qualityStatus: {
    // cyl: {
    //   //cylinder status
    //   type: String,vtype:"String",
    //   default: "",
    //   $ifNull: "",
    // },

    // gas: {
    //   //gas status
    //   type: String,vtype:"String",
    //   default: "",
    //   $ifNull: "",
    // },
    // status: {
    //   //cylinder status
    //   type: String,vtype:"String",
    //   default: "qualified",
    //   enum: [ "qualified", "discarded", "lowQuality",""],
    // },
          //cylinder status
      type: String,vtype:"String",
      default: "qualified",
      enum: [ "qualified", "discarded", "lowQuality",""],
  },
  financeApStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Finance Approve"],
  },
  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"], ///
  },
  sold_Price: {
    type: Number,vtype:"Number",
    default: 0, ///
  },
  sold_Quantity: {
    type: Number,vtype:"Number",
    default: 0, ///
  },
  //---------------INVISIBLE Columns
  tQC: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQ: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tC: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  //--------- dividing the the tQC(values into paid & receivable)
  tQCp: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCr: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCwzh: {
    //
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCsvat: {
    //
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  //--------- sold Status( onStore)
  tQs: {
    //onstore
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCs: {
    //igonred onStoreQuantities_cost
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  //---------------
  tQt: {
    //sold or taken
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCt: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },

  //--------- dividing the the tQCt(sold_Quantity)_(values into paid & receivable)
  tQCtp: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCtr: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQCtvat: {
    //
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
}

//-------------------------Sale_Schema Ends--------------

export {
    // leaverequestSchema,planSchema,reportSchema,
    //---------------
    // assetSchema,rawmaterialSchema,supplierSchema,
    //-----------------
    customerSchema,goodsSchema,productSchema,
    //---------
    // mispaySchema,monpaySchema,statementSchema,    //------------------
}


