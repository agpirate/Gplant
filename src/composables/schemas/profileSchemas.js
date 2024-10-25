var today = () => new Date();//.toLocaleDateString();//.split("T")[0];
const nul = [null, undefined, false, "", [""], {}];
const acceType=['root','regAdmin','columnPower']

var ObjectId = 'objectId'
let String ='String'
let Number ='Number'
let Array ='Array'
// let Date ='Date'

const threeASchema ={
  group:{ type: String,default: "",required: true,unique: true,},
  profile: {
     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin", "userAuthorization", "","lastName","keyID","name", "gmStatus"],
    }], 
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   user: {
    role:[{
     type: String,
     required: false,default: null,
     enum: ["root", "regAdmin", "userAuthorization", "","lastName","keyID","name", "gmStatus"],
   }], 
   capability: {
     type: String,
     required: false,default: '00000',
    },
    accstage: {
     type: Array,
     required: false,default: null,
    }
  },
   attendance: {
     role:[{
      type: String,
      required: false,default: '00000',
      enum: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],

    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   plan: {

     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin", "gmStatus", ""],

    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   report: {

     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin", "gmStatus", ""],

    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   leavereq: {
     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin", "gmStatus", ""],
    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   supplier: {
     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin","gmStatus", ""],
    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   asset: {

     role:[{
      type: String,
      required: false,default: null,
      enum: [ //since mongod doen't support enumed_aaray type , but we will use it in _form building
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
    }],
    capability: {
      type: String,
       required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   rawmaterial: {
     role:[{
      type: String,
      required: false,default: null,
      enum: [ //since mongod doen't support enumed_aaray type , but we will use it in _form building
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
    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   goods: {

     role:[{
      type: String,
      required: false,default: null,
      enum: [ //since mongod doen't support enumed_aaray type , but we will use it in _form building
        "root",
        "regAdmin",
        "financeStatus",
        "financeApStatus",
        "qualityStatus",
        "storeStatus",
        "takenBy",
        "saleStatus",
        "gmStatus",
        "view",
        "",
      ],
    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   customer: {

     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin","gmStatus", ""],
    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   product: {

     role:[{
      type: String,
      required: false,default: null,
      enum: [  //since mongod doen't support enumed_aaray type , but we will use it in _form building
        //it would inserted here, but not on mongoose schema,,since mongoose only looks for array of items
        "root",
        "regO2",
        "regCo2",
        "regC2h2",
        "regAdmin",
        "financeApStatus",
        "storeStatus",
        "takenBy",
        "qualityStatus",
        "saleStatus",
        "gmStatus",
        "view",
        ""
      ],
    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   mainten: {

     role:[{
      type: String,
      required: false,default: null,
      enum: ["", "root", "regAdmin", "maintenanceStatus", "gmStatus"],
    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   statment: {
     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin", "", "gmStatus"],
    }],
    capability: {
      type: String,
      required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   monpay: {

     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin", "", "gmStatus"],
    }],
    capability: {
      type: String,
       required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
   mispay: {

     role:[{
      type: String,
      required: false,default: null,
      enum: ["root", "regAdmin", "", "gmStatus"],
    }],
    capability: {
      type: String,
       required: false,default: '00000',
     },
     accstage: {
      type: Array,
      required: false,default: null,
     }
   },
}

const user3A =
{
        profile: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],
        },
    
        attendance: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],
        },
    
        plan: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["root", "regAdmin", "gmStatus", ""],
        },
    
        report: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["root", "regAdmin", "gmStatus", ""],
        },
    
        leavereq: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["root", "regAdmin", "gmStatus", ""],
        },
    
  //------------------------------Purchasess
  supplier: {
    type: String,vtype:"String",
    enum: ["root", "regAdmin","gmStatus", ""],
    default: "",
    $ifNull: "",
  },
  asset: {
    type: Array,
    default: [""],
    venum: [ //since mongod doen't support enumed_aaray type , but we will use it in _form building
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
  },
  rawmaterial: {
    type: Array,
    default: [""],
    $ifNull: [""],
    venum: [ //since mongod doen't support enumed_aaray type , but we will use it in _form building
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
  },
  goods: {
    type: Array,
    default: [""],
    $ifNull: [""],
    venum: [ //since mongod doen't support enumed_aaray type , but we will use it in _form building
      "root",
      "regAdmin",
      "financeStatus",
      "financeApStatus",
      "storeStatus",
      "takenBy",
      "saleStatus",
      "gmStatus",
      "view",
      "",
    ],
  },
  //--------------------Product & Sales
  customer: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin","gmStatus", ""],
  },
  product: {
    type: Array,
    default: [""],
    $ifNull: [""],
    venum: [  //since mongod doen't support enumed_aaray type , but we will use it in _form building
      //it would inserted here, but not on mongoose schema,,since mongoose only looks for array of items
      "root",
      "regO2",
      "regCo2",
      "regC2h2",
      "regAdmin",
      "financeApStatus",
      "storeStatus",
      "takenBy",
      "qualityStatus",
      "saleStatus",
      "gmStatus",
      "view",
    ],
  },
    
        mainten: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["", "root", "regAdmin", "maintenanceStatus", "gmStatus"],
        },
        //--------------------expense
        statment: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["root", "regAdmin", "", "gmStatus"],
        },
        monpay: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["root", "regAdmin", "", "gmStatus"],
        },
        mispay: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
          enum: ["root", "regAdmin", "", "gmStatus"],
        },
    //--------------------------------------Statments
  } // dataPriviledges...Object_Optionals
//root,admin,regAdmin,finance,store,sale,gm,view
//---------------------------Procurment_Schema Ends

const profileSchema =  
{
  //proImage: {
  //  data: Buffer,
  //   contentType: '"String"',
  // },

  // profile: { type: String,vtype:'file',default: "/uploads/images/yirgumini.jpg" },

  // profileMeta : {
  //   //contentType: { type: String,vtype:"String", default: ""},
  //   mimetype: { type: String,vtype:"String", default: ""},
  //   encoding: { type: String,vtype:"String", default: ""},
  //   originalname: { type: String,vtype:"String", default: ""},
  //   destination: { type: String,vtype:"String", default: ""},
  //   fieldname: { type: String,vtype:"String", default: ""},
  //   filename: { type: String,vtype:"String", default: ""},
  //   size: { type: String,vtype:"String", default: ""},
  //   path: { type: String,vtype:"String", default: ""},
  //   //-----
  //   geoLocation: { type: String,vtype:"String", default: ""},      
    
  // },

  //-----------------
  name: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    required: true,
    //---
    validRuleset:"[ val => val && val.length > 0 || 'Please type something']"
  },
  lastName: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
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
  // CvFiles: {
  //   //files
  //   vtype:"file",
  //   type: String,
  //   default: "",
  // },

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
  companyID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    required: true,
    index: { unique: true, dropDups: true },
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },

  keyID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
    index: { unique: true, dropDups: true },
    required: true,
  },
  // DataPrivilege:  user3A , // dataPriviledges...Object_Optionals
  //--------------------------------
  // acckey:{ type:ObjectId, ref: "threeas" }, //"acctype"/"_id": ObjectId("62d01d17cdd1b7c8a5f945b9")
  loan: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
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
  //---------------------------------
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
      default: new Date(),
    },
    Employeement: {
      type: Date,vtype:"Date", 
      default: new Date(),
    },
   Leave: {
      type: Date,vtype:"Date", 
      default: new Date(),
    },
  },

  salary: {
    grossSalary: {
      type: Number,vtype:"Number",
      default: 0,
      $ifNull: 0,
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
  //---------------------------------
  
}


//------------

export {
    profileSchema,
    user3A,threeASchema,

    // statementSchema,monpaySchema,mispaySchema
}


