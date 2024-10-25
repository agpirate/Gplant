var today = () => new Date();//.toLocaleDateString();//.split("T")[0];
const nul = [null, undefined, false, "", [], {}];
const acceType=['root','regAdmin','columnPower']

var ObjectId = 'objectId'
let String ='String'
let Number ='Number'
let Array ='Array'
// let Date ='Date'
//------------------------Finance_chema Ends

const assetSchema=
{
  model: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  assetName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
//   assetOf: {
//     type: String,vtype:"String",
//     default: "Oxygen-Plant",
//     $ifNull: "",
//     enum: ["", "Acetylene-Plant", "Oxygen-Plant","Acetylene-Plant","Store", "Compound"],
// },
  catagories: {
    type: String,vtype:"String",
    default: "Machinery",
    $ifNull: "",
    enum: ["Machinery","RaWMatterial", "Consumable", "Accessory", "Tools","Spares","Sanitary","Other"],
  },
  // subCat: {
  //   type: String,vtype:"String",
  //   default: "Mechanical",
  //   $ifNull: "",
  //   enum: ["","Mechanical","Electical","Part","",""],
  // },
  assetID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },

  UoM: {
    type: String,vtype:"String",
    default: "Pcs",
    $ifNull: "",
    enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
  },

  //-----------------------------------------======
  ItemQs: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  unitCost: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  //-------------------
  supplier:[{
      paymentMethod: {
       type: String,vtype:"String",
        default: "bank",
        enum: [ "cash", "bank", "check", "credit"],
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
  }],
  //-------------
  financeStatus: {
    totalCost: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    auditStatus: {
      type: String,vtype:"String",
      $ifNull: "",
      default: "",
      enum: ["", "Vr"],
    },
    // witholdTax: {
    //   type: Number,vtype:"Number",
    //   default: 0,
    //   $ifNull: 0,
    // },
    receiptNo: {
      type: String,vtype:"String",
      $ifNull: "",
      default: "",
    },
    date: { type: Date,vtype:"Date", default: today },
  },
  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  },

  //---------------------------------------------=========
  storeStatus: {
    Onstore: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    taken: {
      type: Number,vtype:"Number",
      disable:true,
      default: 0,
      $ifNull: 0,
    },  
    status: {
      //the receipable of the issued item has been received all ( confirm)
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
      // takenID: {
      //  type: String,vtype:"String",
      //   default: "",
      // },
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
    qualityStatus: {
      type: String,vtype:"String",
      default: "qualified",
      $ifNull: "qualified",
      enum: ["", "qualified", "discarded", "lowQuality"],
    },
  userID: {
    type: String,vtype:"String",
    default: "",
  },

}

const rawmaterialSchema= 
{

  // rawType: {
  //   type: String,vtype:"String",
  //   default: "",
  // },

  rawName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  plantraws: {
    type: String,vtype:"String",
    default: "Acetylene",
    $ifNull: "",
    enum: ["", "Acetylene", "Oxygen","Co2","reuseable", "Facilities"],
  },
  UoM: {
    type: String,vtype:"String",
    default: "Pcs",
    $ifNull: "",
    enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
  },


  tags: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },

  qualityStatus: {
    type: String,vtype:"String",
    default: "qualified",
    $ifNull: "",
    enum: ["", "qualified", "discarded", "lowQuality"],
  },

  ItemQs: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  },
  userID: {
    type: String,vtype:"String",
    default: "",
  },

  supplier:[   {
    paymentMethod: {
      type: String,vtype:"String",
       default: "bank",
       enum: [ "cash", "bank", "check", "credit"],
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
}],
  //--------------------------------------
  cost: {
    unitCost: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    importCost: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    otherCosts: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
  },

  //-----------------------
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
    // witholdTax: {
    //   type: Number,vtype:"Number",
    //   default: 0,
    //   $ifNull: 0,
    // },
    receiptNo: {
      type: String,vtype:"String",
      default: "",
    },
    date: { type: Date,vtype:"Date", default: today },
  },
  //---------------------------------------------
  storeStatus: {
    // Onstore: {
    //   type: Number,vtype:"Number",
    //   default: 0,
    //   $ifNull: 0,
    // },
    // taken: {
    //   type: Number,vtype:"Number",
    //   default: 0,
    //   $ifNull: 0,
    // },
    status: {
      type: String,vtype:"String",
      default: "",
      enum: ["", "Vr"],
    },
  },
  takenBy: [  {
      userID: {
       type: String,vtype:"String",
        default: "",
      },
      // takenID: {
      //  type: String,vtype:"String",
      //   default: "",
      // },
      ItemQs: {
       type: Number,vtype:"Number",
        default: 0,
      },
      state: {
       type: String,vtype:"String",
        default: "new",
        enum: [ "new", "damaged", "used"],
      },
      //date: {type: Date, default: todday },
    }],
}

const supplierSchema = 
{

  supplierTin: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  supplierName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  supplierID: { type: String,vtype:"String", default: "" },


  rateit: {
    //re-admissions every months....
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "AAA", "AA", "A", "B", "C"],
  },
  reminderDays: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  notes :  {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    textarea: true,

  },
  
  userID: {
    type:String,default:''
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
  //---------------------------------
  
  supplierBankAccount: {
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
  feedback: {
    allowCredit: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
      enum: ["", "high", "medium", "low"],
    },
    provideOnTime: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
      enum: ["", "yes", "medium", "no"],
    },
    overall: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
      enum: ["", "high", "medium", "low"],
    },
    date: { type: Date,vtype:"Date", default: today },
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


}



//---------------------------Procurment_Schema Ends

//----------------------Human Resource _Schema Ends.....

//-------------------Employee Profile and Meta Edns



//-------------------------Sale_Schema Ends--------------

export {
    // leaverequestSchema,planSchema,reportSchema,
    //---------------
    assetSchema,rawmaterialSchema,supplierSchema,
    //-----------------
    // customerSchema,goodsSchema,productSchema,
    //---------
    // mispaySchema,monpaySchema,statementSchema,    //------------------
}


