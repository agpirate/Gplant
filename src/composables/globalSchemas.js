var today = () => new Date();//"";// () => "";//.toLocaleDateString();//.split("T")[0];
const nul = [null, undefined, false, "", [], {}];
const acceType=['root','regAdmin','columnPower']

const accetype =
{

  employee: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],
  },

  attendance: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

  },

  plan: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "gmStatus", ""],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

  },

  report: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "gmStatus", ""],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

  },

  leavereq: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "gmStatus", ""],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

  },

  //------------------------------Purchasess
  supplier: {
    type: String,vtype:"String",
    enum: ["root", "regAdmin","gmStatus", ""],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

    default: "",
    $ifNull: "",
  },
  asset: {
    type: Array,
    default: [],
    venum: [ //since mongod doen't support enumed_aaray type , but we will use it in client_form building
      //it would inserted here, but not on mongoose schema,,since mongoose only looks for array of items
      "root",
      "regAdmin",
      "financeStatus",
      "storeStatus",
      "takenBy",
      //"returnedBy",
      "gmStatus",
      "",
    ],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

  },
  rawmaterial: {
    type: Array,
    default: [],
    $ifNull: [],
    venum: [ //since mongod doen't support enumed_aaray type , but we will use it in client_form building
      //it would inserted here, but not on mongoose schema,,since mongoose only looks for array of items
      "root",
      "regAdmin",
      "financeStatus",
      "storeStatus",
      "qualityStatus",
      "takenBy",
      "gmStatus",
      "",
    ],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

  },
  goods: {
    type: Array,
    default: [],
    $ifNull: [],
    venum: [ //since mongod doen't support enumed_aaray type , but we will use it in client_form building
      "root",
      "regAdmin",
      "financeStatus",
      "financeApStatus",
      "storeStatus",
      "saleStatus",
      "gmStatus",
      "view",
      "",
    ],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

  },
  //--------------------Product & Sales
  customer: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin","gmStatus", ""],
    _s_: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

  },
  product: {
    type: Array,
    default: [],
    $ifNull: [],
    venum: [  //since mongod doen't support enumed_aaray type , but we will use it in client_form building
      //it would inserted here, but not on mongoose schema,,since mongoose only looks for array of items
      "root",
      "regO2",
      "regCo2",
      "regC2h2",
      "regAdmin",
      "financeApStatus",
      "storeStatus",
      "qualityStatus",
      "saleStatus",
      "gmStatus",
      "view",
    ],
    _s_: ["root", "regAdmin", "0", "1", "2","3","4"],

  },

  mainten: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "root", "regAdmin", "maintenanceStatus", "gmStatus"],
    _s_: ["root", "regAdmin", "0", "", "1"],

  },
  //--------------------expense
  statment: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "", "gmStatus"],
    _s_: ["root", "regAdmin", "0", ""],

  },
  monpay: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "", "gmStatus"],
    _s_: ["root", "regAdmin", "0", ""],

  },
  mispay: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "", "gmStatus"],
    _s_: ["root", "regAdmin", "0", ""],

  },
    //--------------------------------------Statments
  } // dataPriviledges...Object_Optionals

  
const statementSchema= 
{

  ReportDate: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  //-------------------------Income
  PD_G_Inc: {
    //good income paid
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  RL_G_Inc: {
    //--------------- && receivable....
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  PD_P_Inc: {
    type: Number,vtype:"Number",
    default: 0,
  },
  RL_P_Inc: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },

  Cap_Inc: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  //-----------
  VAT_Inc: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  WIZ_Exp:{
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },

  //--------------------------Expense
  incomeTax: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },

  PD_Exp: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  RL_Exp: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  Mon_Exp: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  Mis_Exp: {
    type: Number,vtype:"Number",
    default: 0,
  },
  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  },
  companyID: {
    type: String,vtype:"String",
    default: "",
  },
  //---------------------------------


  //--------------net

}

const monpaySchema = 
    {

      monthlySalary: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      employeeTax: {
        ////?????????
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      power: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      tele: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      withhold: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      water: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      vat: {
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
      companyID: {
        type: String,vtype:"String",
        $ifNull: "",
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

const mispaySchema = 
{

  miscellenouseExp: {
    type: String,vtype:"String",
    default: "",
    enum: ["", "promotion", "fuel", "rent", "capitalReturn", "others"],
  },
  amount: {
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  otherExp: {
    name: {
      type: String,vtype:"String",
      default: "",
    },
    amount: {
      type: Number,vtype:"Number",
      $ifNull: 0,
      default: 0,
    },
  },
  //--------------
  receipent_ID: {
    type: String,vtype:"String",
    default: "",
  },
  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  },
  companyID: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  //---------------------------------
  /*
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
  */
}

//------------------------Finance_chema Ends


const assetSchema=
{

  model: {
    type: String,vtype:"String",
    default: "..",
    $ifNull: "..",
  },
  assetName: {
    type: String,vtype:"String",
    default: "...",
    $ifNull: "...",
  },
  assetOf: {
    type: String,vtype:"String",
    default: "Oxygen-Plant",
    $ifNull: "Oxygen-Plant",
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
    default: "Part",
    $ifNull: "Part",
    enum: ["","Mechanical","Electical","Part","",""],
  },
  assetID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  UoM: {
    type: String,vtype:"String",
    default: "M3",
    $ifNull: "M3",
    enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
  },

  //-----------------------------------------======
  ItemQs: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  cost: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
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
    takenBy: { 
      type:Array,
      default:[{
        companyID:"cash",takenID:"",ItemQs:"",state:""
      }],
      vdata:       {
        companyID: {
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
     },
  //-------------------
  supplier:{
    type:Array,
    default:[{
      paymentMethod:"cash",receiptNo:"",supplierID:""
    }],
    vdata:      {
      paymentMethod: {
       type: String,vtype:"String",
        default: "cash",
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
  },


  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  },
  companyID: {
    type: String,vtype:"String",
    default: "",
  },

  //------------------------------- Computed Values ( stored-due purchasing)
   /*
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
  */
}

const rawmaterialSchema= 
{

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
    default: "M3",
    $ifNull: "M3",
    enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
  },
  //-------------------
  supplier:{
    type:Array,
    default:[{
      paymentMethod:"cash",receiptNo:"",supplierID:""
    }],
    vdata:      {
      paymentMethod: {
       type: String,vtype:"String",
        default: "cash",
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
  },
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
    default: 1,
    $ifNull: 1,
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
    default: "qualified",
    $ifNull: "qualified",
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
  takenBy: { 
    type:Array,
    default:[{
      companyID:"cash",takenID:"",ItemQs:"",state:""
    }],
    vdata:       {
      companyID: {
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
        default: "new",
        enum: [ "new", "damaged", "used"],
      },
      //date: {type: Date, default: todday },
    },
   },

  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  },
  companyID: {
    type: String,vtype:"String",
    default: "",
  },
  //------------------------------- Computed Values ( stored-due purchasing)
    /*
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
  */
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
  companyID: {
    type:String,default:''
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
  //---------------------------------
    /*
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
  */
}

const maintenanceSchema = 
{

  request: {
    type: String,vtype:"String",
    default: "",
    textarea: true,
    $ifNull: "",
  },
  department: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  position: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  requestID: {
    type: String,vtype:"String",
    default: "",
  },
  requestStatus: {
    type: String,vtype:"String",
    $ifNull: "issued",
    default: "issued",
    enum: ["Maintained", "issued", "None maintained"],
  },
  maintenanceStatus: {
    maintained: {
      type: String,vtype:"String",
      default: "issued",
      enum: ["Yes", "issued", "None maintenable"],
    },
    companyID: {
      type: String,vtype:"String",
      default: "",
    },
    spareUsed: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    description: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
  },
  companyID: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"],
  }
}

//---------------------------Procurment_Schema Ends

const employeeSchema =  
{
  //proImage: {
  //  data: Buffer,
  //   contentType: '"String"',
  // },

  profile: { type: String,vtype:'file',default: "/uploads/images/yirgumini.jpg" },

  profileMeta : {
    //contentType: { type: String,vtype:"String", default: ""},
    mimetype: { type: String,vtype:"String", default: ""},
    encoding: { type: String,vtype:"String", default: ""},
    originalname: { type: String,vtype:"String", default: ""},
    destination: { type: String,vtype:"String", default: ""},
    fieldname: { type: String,vtype:"String", default: ""},
    filename: { type: String,vtype:"String", default: ""},
    size: { type: String,vtype:"String", default: ""},
    path: { type: String,vtype:"String", default: ""},
    //-----
    geoLocation: { type: String,vtype:"String", default: ""},      
    
  },

  //-----------------
  name: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    required: true,
    index: { unique: true, dropDups: true },
    //---
    validRuleset:"[ val => val && val.length > 0 || 'Please type something']"
  },
  lastName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    required: true,
    index: { unique: true, dropDups: true },
  },
  companyID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    required: true,
    index: { unique: true, dropDups: true },
  },
  keyID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    required: true,
  },
  gender: {
    type: String,vtype:"String",
    default: "male",
    $ifNull: "male",
    enum: ["male", "female"],
  },
  

  //img: {
  //  type: String,vtype:"String",
  //},
  address: {
    woreda: {
      type: String,vtype:"String",
      default: "",
    },
    city: {
      type: String,vtype:"String",
      default: "",
    },
    phone: {
      type: String,vtype:"String",
      default: "",
    },
    email: {
      type: String,vtype:"String",
      default: "",
    },
  },
  Dates: {
    Birth: {
      type: Date,vtype:"Date", 
      default: "",
    },
    Employeement: {
      type: Date,vtype:"Date", 
      default: "",
    },
   Leave: {
      type: Date,vtype:"Date", 
      default: "",
    },
  },

  salary: {
    grossSalary: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
    },
    netSalary: {
      default: 0,
      type: Number,vtype:"Number",
    },
    allowance: {
      transport: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      phone: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      houseRent: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
    },
    topUp: {
      type: Number,vtype:"Number",
      default: 0,
    },
    overTime: {
      default: 0,
      $ifNull: 0,
      type: Number,vtype:"Number",
    },
    //tax ; pensions
  },
  loan: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  DataPrivilege:  accetype , // dataPriviledges...Object_Optionals

  //------------
  pension: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  pensionNet: {
    //pensions acculatives
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  pensionRate: {
    type: Number,vtype:"Number",
    default: 0.07,
    $ifNull: 0.07,
  },
  //---------
  taxableSalary: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  taxfreeSalary: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  incomeTax: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  netSalary: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  payDays: {
    type: Number,vtype:"Number",
    default: 26,
    $ifNull: 26,
  },
  //--------------
  Educations: {
    type: String,vtype:"String",
    default: "",
    textarea: true,
    $ifNull: "",
  },
  Expriences: {
    type: String,vtype:"String",
    default: "",
    textarea: true,
    $ifNull: "",
  },


  department: {
    type: String,vtype:"String",
    default: "others",
    $ifNull: "others",
    enum: [
      "Managment",
      "Production",
      "Procurement",
      "Store",
      "Finance",
      "Marketing & Sales",
      "HR & Dev",
      "others",
      "",
    ],
  },
  position: {
    type: String,vtype:"String",
    default: "others",
    $ifNull: "others",
    enum: [
      "GM",
      "D-GM",
      "Finanace Head",
      "Marketing Officer",
      "Maintenance Supervisor",
      "Maintenance Head",
      "Supervisor",
      "Electrical Maintenance",
      "Operator",
      "Quality Control",
      "Lab Technicial",
      "Sales Officer",
      "S-Guard",
      "Casher",
      "Chef Welder",
      "Cleaner",
      "others",
      "",
    ],
  },


  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
  //---------------------------------
    /*
  tQC: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  tQ: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  tC: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  since: {
    type: String,vtype:"String",
    default: 0,
    $ifNull: 0,
  },
  */
}

const attendanceSchema = 
{

  date: {
    type: Date,vtype:"Date", 
    default: new Date(),
    $ifNull: new Date(),
  },
  name: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  pension: {
    type: Number,vtype:"Number",
    default: 0.07,
    $ifNull: 0.07,
  },
  pensionRate: {
    type: Number,vtype:"Number",
    default: 0.07,
    $ifNull: 0.07,
  },
  incomeTax: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  loan: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  netSalary: {
    //taxable salary
    //grosssarly
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  taxfreeSalary: {
    //grosssarly
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  attenSalary: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  payDays: {
    type: Number,vtype:"Number",
    default: 26,
    $ifNull: 26,
  },
  presenceDays : {    
     type: Number,vtype:"Number",
    default: 26,
    $ifNull: 26,
  }, 

  companyID: {
    type: String,vtype:"String",
    default: "",
  },

  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },

  //-------
  /*
  tC: {
    //base Salary
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQ: {
    //present Days
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tQC: {
    //netSala Days
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  */
}

const planSchema = 
{

  planName: {
    type: String,vtype:"String",
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
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },

  department: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  position: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  planPeriod: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  units: { type: Number,vtype:"Number", default: 1, $ifNull: 0 },
  UoM: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  Content: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
    textarea: true,
  },

  performance: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  companyID: {
    type: String,vtype:"String",
    default: "",
  },

  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
}


const reportSchema = 
{

  reportName: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },

  reportID: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  department: {
    type: String,vtype:"String",
    default: "",
  },
  position: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  contents: {
    type: String,vtype:"String",
    default: "",
    textarea: true,
  },
  performance: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  companyID: {
    type: String,vtype:"String",
    default: "",
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    $ifNull: "",
    default: "",
  },
}

const leaverequestSchema = 
{

  planID: {
    type: String,vtype:"String",
    default: "",
  },
  department: {
    type: String,vtype:"String",
    default: "",
  },
  position: {
    type: String,vtype:"String",
    default: "",
  },
  request: {
    type: String,vtype:"String",
    enum: ["", "annual", "sick", "demand"],
    default: "",
    textarea: true,
  },
  leaveDate: {
    type: Date,vtype:"Date", 
    default: "",
  },
  returnDate: {
    type: Date,vtype:"Date",
    default: "",
  },

  days: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  companyID: {
    type: String,vtype:"String",
    default: "",
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
}

//----------------------Human Resource _Schema Ends.....




//-------------------Employee Profile and Meta Edns


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
    default: 0,
    $ifNull: 0,
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
  cylinders: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
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

 
  feedback: {
    buyFrequency: {
      type: String,vtype:"String",
      default: "",
      $ifNull: "medium",
      enum: ["", "high", "medium", "low"],
    },
    takesCredit: {
      type: String,vtype:"String",
      default: "Yes",
      $ifNull: "Yes",
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
  companyID: {
    type: String,vtype:"String",
    default: "",
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
  //-----------------------
    /*
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
  */
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
  cylSerial: {
    type: String,vtype:"String",
    default: "21700482-",
    $ifNull: "21700482-",
  },
  ItemQs: {
    type: Number,vtype:"Number",
    default: 1, $ifNull: 1,
 
  },
  cost: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },

  tags: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },

  UoM: {
    type: String,vtype:"String",
    default: "M3",
    $ifNull: "",
    enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
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
    date: { type: Date,vtype:"Date", default: "" },
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
  saleStatus:{
    type:Array,
    default:[{
      customerID:"",unitPrice:0,ItemQs:0,Price:0,paymentMethod:"",receiptNo:"",vat:""
    }],
    vdata:       {
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
        }, //prplusVat
        vat: {
          type: Number,vtype:"Number",
           default: 0,
         },
         prplusVat: {
          type: Number,vtype:"Number",
           default: 0,
         },
         date:today
      }
  },
  supplier:{
    type:Array,
    default:[{
      paymentMethod:"cash",receiptNo:"",supplierID:""
    }],
    vdata:      {
      paymentMethod: {
       type: String,vtype:"String",
        default: "cash",
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
  },

  qualityStatus: {
    type: String,vtype:"String",
    default: "qualified",
    $ifNull: "qualified",
    enum: ["", "qualified", "discarded", "lowQuality"],
  },

  Price: {
    type: Number,vtype:"Number",
    
    default: 0, ///
  },
  customerID: {
    type: String,vtype:"String",
    default: "", ///
  },

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
  companyID: {
    type: String,vtype:"String",
    default: "",
  },

  //---------------INVISIBLE Columns
  //------------ procurment side computing the Quantity , unitCost(setof) and total Cost
    /*
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
  */
}



const productSchema = 
{

  productName: {
    type: String,vtype:"String",
    default: "Oxygen",
    $ifNull: "Oxygen",
    enum: ["", "Oxygen", "Carbondioxide", "Acetylene", "Aceton","N2(L)","N2(G)"],
  },
  UoM: {
    type: String,vtype:"String",
    default: "M3",
    $ifNull: "M3",
 enum: ["", "Set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
  },
  cylSerial: {
    type: String,vtype:"String",
    default: '2170482-',
    $ifNull: '2170482-',
    index: { unique: true, dropDups: true },
  },
  cylOwner: {
    type: String,vtype:"String",
    default: "Customer's",
    $ifNull: "Customer's",
    enum: ["", "Ours", "Customer's"],
  },
  cylStatus: {
    type: String,vtype:"String",
    default: "normal",
    $ifNull: "normal",
    enum: ["", "painted", "tested", "normal", "suspicious"],
  },
  cylAmount: {
    //
    type: Number,vtype:"Number",
    default: 40,
    $ifNull: 40,
  },
  customerID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
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

  saleStatus: {
    type:Array,
    default:[{
      customerID:"",unitPrice:0,ItemQs:0,Price:0,paymentMethod:"",receiptNo:"",vat:""
    }],
    vdata:       {
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
         date:today
      }
  },
  cylPressure: {
    type: Number,vtype:"Number",
    default: 150,
    $ifNull: 150,
  },

  r_Time: { //for engineers(Registration admin)of goods upto delivering to store ( not for noncylProducts)
    type: Date,vtype:"Date",
    default: "",
    $ifNull: "",
  },
  d_Time: {
    type: Date,vtype:"Date",
    default: "",
    $ifNull: "",
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

  qualityStatus: {
    cyl: {
      //cylinder status
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },

    gas: {
      //gas status
      type: String,vtype:"String",
      default: "",
      $ifNull: "",
    },
    status: {
      //cylinder status
      type: String,vtype:"String",
      default: "qualified",
      enum: [ "qualified", "discarded", "lowQuality"],
    },
  },
  financeApStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Finance Approve"],
  },
  companyID: {
    type: String,vtype:"String",
    default: "",
  },
  gmStatus: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["", "Vr"], ///
  },
  Price: {
    type: Number,vtype:"Number",
    default: 0,
  },

  //---------------INVISIBLE Columns
    /*
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
  */
}


//-------------------------Sale_Schema Ends--------------


export {

    attendanceSchema,employeeSchema,leaverequestSchema,planSchema,reportSchema,
    //---------------
    assetSchema,maintenanceSchema,rawmaterialSchema,supplierSchema,
    //-----------------
    customerSchema,goodsSchema,productSchema,
    //---------
    mispaySchema,monpaySchema,statementSchema,    //------------------

    accetype

}


