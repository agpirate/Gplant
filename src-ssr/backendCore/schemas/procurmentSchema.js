var today = () => new Date();//.toLocaleDateString();//.split("T")[0];
const nul = [null, undefined, false, "", [], {}];
const acceType=['root','regAdmin','columnPower']

//------------------------Finance_chema Ends

const assetSchema=
{
  _stage_: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,

  },
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
  assetOf: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Acetylene-Plant", "Oxygen-Plant","Acetylene-Plant","Store", "Compound"],
},
  catagories: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Machinery","RaWMatterial", "Consumable", "Accessory", "Tools","Spares","Sanitary"],
  },
  subCat: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["","Mechanical","Electical","Part","",""],
  },
  assetID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },

  UoM: {
    type: String,vtype:"String",
    default: "",
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
    witholdTax: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
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

  /*[ 
  {
    userID: {
  type:String,default:''
},
        takenID: {
        type: String,vtype:"String",
        default: "",
      },

quantity: {
  type:Number,default:0,$:0,
},

state: {
  type:String,default:"",$:"",
  enum: ["","new", "damaged", "used"],
},
date: { type: 'Date', default: today },
}
],*/
  //returnedBy:
  //{ type: Array, 
  //  default: []
  // },
   /*
   [
    {
      userID: {
        type: String,vtype:"String",
        default: "",
      },

      returnID: {
        type: String,vtype:"String",
        default: "",
      },
      quantity: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      state: {
        type: String,vtype:"String",
        default: "",
        $ifNull: "",
        enum: ["", "damaged", "used", "lost", "maintainable"],
      },
      date: { type: "Date", default: today },
    },
  ],
  */
  userID: {
    type: String,vtype:"String",
    default: "",
  },
  //------------------------------- Computed Values ( stored-due purchasing)
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

const rawmaterialSchema= 
{
  _stage_: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,

  },
  rawType: {
    type: String,vtype:"String",
    default: "",
  },

  rawName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  plantraws: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Acetylene", "Oxygen","Co2","reuseable", "Facilities"],
  },
  UoM: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
  },
  supplier:[    {
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
    },
  ],
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
  ItemQs: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
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
  //---------------------------------------------
  tags: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },

  qualityStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "qualified", "discarded", "lowQuality"],
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
  takenBy: [    {
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
    },
    
  ],
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
  //------------------------------- Computed Values ( stored-due purchasing)
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

const supplierSchema = 
{
  _stage_: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,

  },
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
  userID: {
    type:String,default:''
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
  //---------------------------------
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


