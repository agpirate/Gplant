var today = () => new Date();//.toLocaleDateString();//.split("T")[0];

var ObjectId = 'objectId'
let String ='String'
let Number ='Number'
let Array ='Array'
// let Date ='Date'

const customerSchema = 
{

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
  customerTIN: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
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
}

const goodsSchema = 
{

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
    default: "xyxyxyxyx",
    $ifNull: "xyxyxyxyx",
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
  qualityStatus: {
    type: String,vtype:"String",
    default: "qualified",
    $ifNull: "qualified",
    enum: ["", "qualified", "discarded", "lowQuality"],
  },

  // sold_Price: {
  //   type: Number,vtype:"Number",
    
  //   default: 0, ///
  // },
  // sold_Quantity: {
  //   type: Number,vtype:"Number",
  //   default: 0, ///
  // },
  // customerID: {
  //   type: Number,vtype:"String",
  //   default: "", ///
  // },
  // financeApStatus:{
  //   type: String,vtype:"String",
  //   default: "",
  //   $ifNull: "",
  //   enum: ["", "Finance Approve"],
  // },
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

  supplier:[  {
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
        // Price: {
        //   type: Number,vtype:"Number",
        //    default: 0,
        //  },
        paymentMethod: {
         type: String,vtype:"String",
          default: "bank",
          enum: [ "","cash", "bank", "check", "credit"],
        },
        receiptNo: {
         type: String,vtype:"String",
          default: "",
        },
        // vat: {
        //   type: Number,vtype:"Number",
        //    default: 0,
        //  },
        //  prplusVat:{
        //   type: Number,vtype:"Number",
        //    default: 0,
        //  },
        
      }
    ],


}
  //---------------INVISIBLE Columns
  //------------ procurment side computing the Quantity , unitCost(setof) and total Cost
  

const productSchema = 
{

  productName: {
    type: String,vtype:"String",
    default: "Oxygen",
    $ifNull: "",
    enum: ["", "Oxygen", "Carbondioxide", "Acetylene", "Aceton","N2(L)","N2(G)"],
  },

  cylSerial: {
    type: String,vtype:"String",
    default: "xyxyxyxyx",
    $ifNull: "xyxyxyxyx",
    index: { unique: true, dropDups: true },
  },

  cylinderStatus: {
    type: String,vtype:"String",
    default: "tested",
    $ifNull: "",
    enum: ["", "painted", "tested", "normal", "suspicious"],
  },
  cylinderOwner: {
    type: String,vtype:"String",
    default: "Ours",
    $ifNull: "",
    enum: ["", "Ours", "Customer's"],
  },
  //-------------Quantity(Amount) Measurment
  UoM: {
    type: String,vtype:"String",
    default: "Pcs",
    $ifNull: "",
 enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
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
  // quantity: {
  //   //interms of measurments units
  //   type: Number,vtype:"Number",
  //   default: 1, $ifNull: 1,
  // },
  //----------------
  ItemQs: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,
  },
  // unitCost: {
  //   //of unitVolums(m3) ; unit(killo) ; unit(litter)
  //   type: Number,vtype:"Number",
  //   default: 0,
  //   $ifNull: 0,
  // },
  // customerID: {
  //   type: String,vtype:"String",
  //   default: "",
  //   $ifNull: "",
  // },

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

  // productionRate: {
  //   //interm of the timetaken to fill cyl from the time it withdrawn or ordered
  //   type: String,vtype:"String",
  //   default: "",
  //   $ifNull: "",
  // },
  tags: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  // userID: {
  //   type: String,vtype:"String",
  //   default: "",
  // },

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
  // sold_Price: {
  //   type: Number,vtype:"Number",
  //   default: 0, ///
  // },
  // sold_Quantity: {
  //   type: Number,vtype:"Number",
  //   default: 0, ///
  // },
  //---------------INVISIBLE Columns

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
  saleStatus: [ {
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
        // Price: {
        //   type: Number,vtype:"Number",
        //    default: 0,
        //  },
        paymentMethod: {
         type: String,vtype:"String",
          default: "cash",
          enum: [ "","cash", "bank", "check", "credit"],
        },
        receiptNo: {
         type: String,vtype:"String",
          default: "",
        },
        // vat: {
        //   type: Number,vtype:"Number",
        //    default: 0,
        //  },
        //  prplusVat:{
        //   type: Number,vtype:"Number",
        //    default: 0,
        //  },
         date:today
      }
    ],

    qualityStatus: {
      type: String,vtype:"String",
      default: "qualified",
      enum: [ "qualified", "discarded", "lowQuality",""],
    },

  // qualityStatus: {
  //   cyl: {
  //     //cylinder status
  //     type: String,vtype:"String",
  //     default: "",
  //     $ifNull: "",
  //   },

  //   gas: {
  //     //gas status
  //     type: String,vtype:"String",
  //     default: "",
  //     $ifNull: "",
  //   },
  //   status: {
  //     //cylinder status
  //     type: String,vtype:"String",
  //     default: "qualified",
  //     enum: [ "qualified", "discarded", "lowQuality",""],
  //   },
  // },
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


