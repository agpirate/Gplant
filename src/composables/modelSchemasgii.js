
import user3A from "src/hooks/accetype";
var today = () => new Date().toLocaleDateString();//.split("T")[0];

//-------------USER PROFILE_Variables..

const planSchema = {
  planName: {
   type: String,
    enum: [
      "employee",
      "plantO2",
      "plantCo2",
      "plantC2H2",
      "store",
      "Marketing",
      "Finance",
    ],
    default: "employee",
    $ifNull: "employee",
  },
  planID: {
   type: String,
    $ifNull: "",
    default: "",
  },
  companyID: {
   type: String,
    $ifNull: "",
    default: "",
  },
  department: {
   type: String,
    $ifNull: "",
    default: "",
  },
  position: {
   type: String,
    default: "",
  },
  planPeriod: {
   type: Date,vtype:"Date",
    default: today,
  },
  Content: {
   type: String,
    $ifNull: "",
    default: "",
    textarea: true,
  },
  UoM: {
   type: String,
    $ifNull: "",
    default: "",
  },
  units: {type: Number,vtype:"Number", default: 0, $ifNull: 0 },
  performance: {
   type: String,
    $ifNull: "",
    default: "",
  },
  gmStatus: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  },
}

const productSchema = {
  productName: {
      type: String,
      default: "Oxygen",
      $ifNull: "Oxygen",
      enum: [ "Oxygen", "Carbondioxide", "Acetylene", "Aceton","N2(L)","N2(G)"],
    },
  cylSerial: {
   type: String,
    default: "21700482-",
  },
  cylStatus: {
   type: String,
    default: "tested",
    enum: [ "painted", "tested", "normal", "suspicious"],
  },
  UoM: {
   type: String,
    default: "M3",
   enum: ["Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
    },
  cylAmount: {
   type: Number,vtype:"Number",
    default: 40.5,
  },
  cylOwner: {
   type: String,
    default: "Ours",
    enum: [ "Ours", "Customer's"],
  },
  customer_ID: {
    type: String,
    default: "",
    $ifNull: "",
  },

  timeA: {type: Date,vtype:"Date", default: today },
  timeB: {type: Date,vtype:"Date", default: today },

  cylPressure: {
   type: Number,vtype:"Number",
    default: 150,
  },

  ItemQs: {
    //item number(cylinder is One)
   type: Number,vtype:"Number",
    default: 1,
  },
  quantity: {
    // interm of units ofuom
   type: Number,vtype:"Number",
    default: 1,
  },
  tags: {
   type: String,
    default: "",
  },
  storeStatus: {
    Onstore: {
     type: Number,vtype:"Number",
      default: 0,
    },
    taken: {
     type: Number,vtype:"Number",
      default: 0,
    },
    status: {
     type: String,
      default: "",
      enum: [ "Vr"],
    },
  },
  Price: {
    type: Number,vtype:"Number",
    default: 0, ///
  },
  saleStatus: {
      type:Array,
      default:[{
        customerID:"",unitPrice:0,ItemQs:1,Price:0,paymentMethod:"",receiptNo:"",vat:""
      }],
      vdata:       {
          //form of sale
          customerID: {
            type: String,
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
           type: String,
            default: "cash",
            enum: [ "","cash", "bank", "check", "credit"],
          },
          receiptNo: {
           type: String,
            default: "",
          },
          vat: {
            type: Number,vtype:"Number",
             default: 0,
           },
           date:today
        }
    },
  
  cost: {
   type: Number,vtype:"Number",
    default: 0,
  },
  qualityStatus: {
    cyl: {
      //cylinder status
     type: String,
      default: "",
      $ifNull: "",
    },
    gas: {
      //gas status
     type: String,
      default: "",
      $ifNull: "",
    },
    status: {
      type: String,
      default: "qualified",
      enum: [ "qualified", "discarded", "lowQuality"],
    },
  },
  financeApStatus: {
   type: String,
    default: "",
    enum: [ "Finance Approve"],
  },
  gmStatus: {
      type: String,
      default: "",
      $ifNull: "",
      enum: ["", "Vr"],
    },
  companyID: {
   type: String,
    default: "",
  },
}

const rawmaterialSchema = {

  rawName: {
   type: String,
    default: "",
  },
  plantraws: {
      type: String,
      default: "Oxygen",
      $ifNull: "",
      enum: [ "Acetylene", "Oxygen","Co2","reuseable", "Facilities"],
    },
    rawType: {
      type: String,
       default: "",
     },
     UoM: {
      type: String,
       default:"Pcs",
       enum: [ "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
       },
  ItemQs: {
   type: Number,vtype:"Number",
    default: 1,
  },
  tags: {
    type: String,
     default: 0,
   },
  //{type:Array,default:[]},
  supplier:{
    type:Array,
    default:[{
      paymentMethod:"cash",receiptNo:"",supplierID:""
    }],
    vdata:      {
      paymentMethod: {
       type: String,
        default: "cash",
        enum: [ "cash", "bank", "check", "credit"],
      },
      receiptNo: {
        type: String,
         default: "",
       },
      supplierID: {
       type: String,
        default: "",
        ref:"supplier"
      },
    },
  },

  cost: {
    unitCost: {
     type: Number,vtype:"Number",
      default: 0,
    },
    importCost: {
     type: Number,vtype:"Number",
      default: 0,
    },
    otherCosts: {
     type: Number,vtype:"Number",
      default: 0,
    },
  },

  financeStatus: {
    totalCost: {
     type: Number,vtype:"Number",
      default: 0,
    },
    auditStatus: {
     type: String,
      enum: [ "Verfied"],
      default: "",
    },
    witholdTax: {
     type: Number,vtype:"Number",
      default: 0,
    },
    receiptNo: {
     type: String,
      default: "",
    },
    date: {type: Date,vtype:"Date", default: today },
  },
  qualityStatus: {
   type: String,
    default: "qualified",
    enum: [ "qualified", "discarded", "lowQuality"],
  },
  userID: {
    type: String,
    default: "",
    ref: "employees",
  },
  storeStatus: {
    Onstore: {
     type: Number,vtype:"Number",
      default: 0,
    },
    taken: {
     type: Number,vtype:"Number",
      default: 0,
    },
    status: {
     type: String,
      default: "",
      enum: [ "Vr"],
    },
  },
  //{type:'Array',default:[]},
  takenBy:{
    type:Array,
    default:[{
      companyID:"cash",takenID:"",ItemQs:"",state:""
    }],
    vdata:       {
      companyID: {
       type: String,
        default: "",
      },
      quantity: {
        type: Number,vtype:"Number",
         default: 0,
       },
      takenID: {
       type: String,
        default: "",
      },
      ItemQs: {
       type: Number,vtype:"Number",
        default: 0,
      },
      state: {
       type: String,
        default: "",
        enum: [ "new", "damaged", "used"],
      },
      date: {type: Date,vtype:"Date", default: today },
      //date: {type: Date, default: todday },
    },
  },

  gmStatus: {
      type: String,
      default: "",
      $ifNull: "",
      enum: ["", "Vr"],
    },
  companyID: {
   type: String,
    default: "",
  },
}
  
const reportSchema = {
  companyID: {
   type: String,
    default: "",
  },
  reportID: {
   type: String,
    default: "",
  },
  department: {
   type: String,
    default: "",
  },
  position: {
   type: String,
    default: "",
  },
  reportName: {
   type: String,
    default: "",
  },
  contents: {
   type: String,
    default: "",
    textarea: true,
  },
  performance: {
   type: String,
    default: "",
  },
  gmStatus: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  }
}

const statementSchema = {
  //-------------------------Income
  ReportDate: {
    //ReportDate
   type: String,
    default: "",
  },
  PD_G_Inc: {
    //good income paid
   type: Number,vtype:"Number",
    default: 0,
  },
  RL_G_Inc: {
    //--------------- && receivable....
   type: Number,vtype:"Number",
    default: 0,
  },
  PD_P_Inc: {
   type: Number,vtype:"Number",
    default: 0,
  },
  RL_P_Inc: {
   type: Number,vtype:"Number",
    default: 0,
  },
  Cap_Inc: {
   type: Number,vtype:"Number",
    default: 0,
  },
  //--------------------------Expense
  incomeTax: {
   type: Number,vtype:"Number",
    default: 0,
  },

  PD_P_Exp: {
   type: Number,vtype:"Number",
    default: 0,
  },
  RL_P_Exp: {
   type: Number,vtype:"Number",
    default: 0,
  },
  Mon_Exp: {
   type: Number,vtype:"Number",
    default: 0,
  },
  Mis_Exp: {
   type: Number,vtype:"Number",
    default: 0,
  },
  gmStatus: {
      type: String,
      default: "",
      $ifNull: "",
      enum: ["", "Vr"],
    },
  companyID: {
   type: String,
    default: "",
  },
}

const supplierSchema = {
  supplierName: {
   type: String,
    default: "",
    $ifNull: "",
  },
  supplierID: {
   type: String,
    default: "",
    $ifNull: "",
  },
  supplierTIN: {
   type: String,
    default: "",
    $ifNull: "",
  },
  supplierBankAccount: {
    accountNumber: {
     type: String,
      default: "",
      $ifNull: "",
    },
    bankName: {
     type: String,
      default: "",
      $ifNull: "",
    },
  },
  address: {
    woreda: {
     type: String,
      default: "",
      $ifNull: "",
    },
    city: {
     type: String,
      default: "",
      $ifNull: "",
    },
    phone: {
     type: String,
      default: "",
      $ifNull: "",
    },
    email: {
     type: String,
      default: "",
      $ifNull: "",
    },
  },
  /*productRequest: [{
      productType: {
        type: String,default:"",:"",
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
        type: String,default:"",$:"",
        enum: ["","cash", "bank", "check", "credit"],
      },
      date: { type: Date, default: today },
    }],*/
  feedback: {
    allowCredit: {
     type: String,
      default: "",
      $ifNull: "",
      enum: ["", "high", "medium", "low"],
    },
    provideOnTime: {
     type: String,
      default: "",
      $ifNull: "",
      enum: ["", "yes", "medium", "no"],
    },
    overall: {
     type: String,
      default: "",
      $ifNull: "",
      enum: ["", "high", "medium", "low"],
    },
    date: {type: Date,vtype:"Date", default: today },
  },
  rateit: {
    //re-admissions every months....
   type: String,
    default: "A",
    $ifNull: "",
    enum: ["AAA", "AA", "A"],
  },
  reminderDays: {
   type: String,
    default: "",
    $ifNull: "",
  },

  notes: {
   type: String,
    default: "",
    $ifNull: "",
    textarea: true,
  },
  companyID: {
        type:String,default:''
      },
      gmStatus: {
        type: String,
        default: "",
        $ifNull: "",
        enum: ["", "Vr"],
      },
}

const goodsSchema = {
  goodsName: {
      type: String,
      default: "",
      $ifNull: "",
    },
    plantgoods: {
      type: String,
      default: "Oxygen",
      $ifNull: "Oxygen",
      enum: [ "Acetylene", "Oxygen","Co2","reuseable", "Facilities"],
    },
    cost: {
      type: 'Number',
      default: 0,
      $ifNull: 0,
    },
    serial: {
      type: String,
      default: "",
      $ifNull: "",
    },
    tags: {
      type: String,
      default: "",
      $ifNull: "",
    },
  ItemQs: {
   type: Number,vtype:"Number",
    default: 1,
  },
  UoM: {
   type: String,
    default: "Pcs",
    enum: [ "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
    },
  cost: {
   type: Number,vtype:"Number",
    default: 0,
  },
  //{type:'Array',default:[]},
  supplier:{
    type:Array,
    default:[{
      paymentMethod:"cash",receiptNo:"",supplierID:""
    }],
    vdata:      {
      paymentMethod: {
       type: String,
        default: "cash",
        enum: [ "cash", "bank", "check", "credit"],
      },
      receiptNo: {
        type: String,
         default: "",
       },
      supplierID: {
       type: String,
        default: "",
        ref:"supplier"
      },
    },
  },

  qualityStatus: {
   type: String,
    default: "qualified",
    enum: [ "qualified", "discarded", "lowQuality"],
  },
  financeStatus: {
    totalCost: {
     type: Number,vtype:"Number",
      default: 0,
    },
    auditStatus: {
     type: String,
      enum: [ "Verfied"],
      default: "",
    },
    witholdTax: {
     type: Number,vtype:"Number",
      default: 0,
    },
    receiptNo: {
     type: String,
      default: "",
    },
    date: {type: Date,vtype:"Date", default: today },
  },
  storeStatus: {
    Onstore: {
     type: Number,vtype:"Number",
      default: 0,
    },
    taken: {
     type: Number,vtype:"Number",
      default: 0,
    },
    status: {
     type: String,
      default: "",
      enum: [ "Vr"],
    },
  },
  Price: {
    type: Number,vtype:"Number",
    default: 0, ///
  },
  //{type:'Array',default:[]},

saleStatus:{
    type:Array,
    default:[{
      customerID:"",unitPrice:0,ItemQs:1,Price:0,paymentMethod:"",receiptNo:"",vat:""
    }],
    vdata:       {
        //form of sale
        customerID: {
          type: String,
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
         type: String,
          default: "cash",
          enum: [ "","cash", "bank", "check", "credit"],
        },
        receiptNo: {
         type: String,
          default: "",
        },
        vat: {
          type: Number,vtype:"Number",
           default: 0,
         },
         date:today
      }
  },

  //  {type:'Array',default:[]},
  financeApStatus: 
    {
     type: String,
      default: "",
      enum: [ "Finance Approve"], ///
    },
  gmStatus: {
      type: String,
      default: "",
      $ifNull: "",
      enum: ["", "Vr"],
    },
  companyID: {
   type: String,
    default: "",
  },
}


  export { planSchema,productSchema,rawmaterialSchema,reportSchema,
  
  statementSchema,supplierSchema,goodsSchema}