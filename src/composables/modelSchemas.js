
import user3A from "src/hooks/accetype";
//var todday = () => Math.floor(Date.now() / 1000);
var todday = () => new Date();//.toLocaleDateString();//.split("T")[0];

//-------------USER PROFILE_Variables..

const employeeSchema = {
    //profile:{type: String,default:'~assets/images/im0.jpg'},
    profile: { type: String,vtype:'file',default: "/uploads/images/yirgumini.jpg" },

    profileMeta : {
      //contentType: { type: String, default: ""},
      mimetype: { type: String, default: ""},
      encoding: { type: String, default: ""},
      originalname: { type: String, default: ""},
      destination: { type: String, default: ""},
      fieldname: { type: String, default: ""},
      filename: { type: String, default: ""},
      size: { type: String, default: ""},
      path: { type: String, default: ""},
      //-----
      geoLocation: { type: String, default: ""},      
      
    },

    //-----------------
    name: {
      type: String,
      default: "",
      $ifNull: "",
      required: true,
      index: { unique: true, dropDups: true },
      //---
      validRuleset:"[ val => val && val.length > 0 || 'Please type something']"
    },
    lastName: {
      type: String,
      default: "",
      $ifNull: "",
      required: true,
      index: { unique: true, dropDups: true },
    },
    companyID: {
      type: String,
      default: "",
      $ifNull: "",
      required: true,
      index: { unique: true, dropDups: true },
    },
    gender: {
      type: String,
      default: "male",
      $ifNull: "male",
      enum: ["male", "female"],
    },

    //img: {
    //  type: String,
    //},
    address: {
      woreda: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
    },
    keyID: {
      type: String,
      default: "",
      $ifNull: "",
      required: true,
    },
    /*
    userAuthorization: {
      username: {
        type: String,default:"",$ifNull:"",required: true 
      },
      password: {
        type: String,default:""
      },
      keyID: {
        type: String,default:"",$ifNull:"",required: true 
      },
      
    },*/
    DataPrivilege:  user3A , // dataPriviledges...Object_Optionals

    Dates: {
      Birth: {
        type: Date, vtype:"Date",
        default: new Date(),
      },
      Employeement: {
        type: Date, vtype:"Date",
        default: new Date(),
      },
     Leave: {
        type: Date, vtype:"Date",
        default: new Date(),
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
      type: String,
      default: "",
      textarea: true,
      $ifNull: "",
    },
    Expriences: {
      type: String,
      default: "",
      textarea: true,
      $ifNull: "",
    },
    CvFiles: {
      //files
      vtype:"file",
      type: String,
      default: "",
    },

    department: {
      type: String,
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
      type: String,
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
      type: String,
      enum: ["", "Vr"],
      default: "",
    },
    //--------------
    //---------------------------------
  
    //---------------------------------
  }

  const assetSchema = {
    model: {
     type: String,
      default: "",
    },
    assetName: {
     type: String,
      default: "",
    },
    codeName: {
        type: String,
        default: "YGP MT 0",
        $ifNull: "",
      },
  
      assetOf: {
        type: String,
        default: "",
        $ifNull: "Store",
        enum: [ "Acetylene-Plant", "Oxygen-Plant","Acetylene-Plant","Store", "Compound"],
    },
      catagories: {
        type: String,
        default: "RaWMatterial",
        $ifNull: "",
        enum: [ "Machinery","RaWMatterial", "Consumable", "Accessory", "Tools","Spares","Sanitary"],
      },
      subCat: {
        type: String,
        default: "",
        $ifNull: "",
        enum: ["Mechanical","Electical","Part","",""],
      },
    cost: {
     type: Number,vtype:"Number",
      default: 0,
    },
    tags: {
     type: String,
      default: "",
    },
    ItemQs: {
     type: Number,vtype:"Number",
      default: 1,
    },
    UoM: {
     type: String,
      default: "Pcs",
      enum: ["set", "Barrel", "Pcs", "Meters","Lts","Kgs","M3"],
      },
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
    financeStatus: {
      totalCost: {
       type: Number,vtype:"Number",
        default: 0,
      },
      auditStatus: {
       type: String,
        default: "",
        enum: [ "Vr"],
      },
      witholdTax: {
       type: Number,vtype:"Number",
        default: 0,
      },
      receiptNo: {
       type: String,
        default: "",
      },
      date: {type: Date,vtype:"Date", default: todday },
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

  const attendanceSchema =
  {
    date: {
     type: Date,vtype:"Date",
      default: new Date(),
    },
    companyID: {
     type: String,
      default: "",
    },
    name: {
     type: String,
      default: "",
    },
    age: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0
      },
    pension: {
     type: Number,vtype:"Number",
      default: 0,
    },
    incomeTax: {
     type: Number,vtype:"Number",
      default: 0,
    },
    loan: {
     type: Number,vtype:"Number",
      default: 0,
    },
    netSalary: {
     type: Number,vtype:"Number",
      default: 0,
    },
    attenSalary: {
     type: Number,vtype:"Number",
      default: 0,
    },
    payDays: {
     type: Number,vtype:"Number",
      default: 0,
    },
    presenceDays: {
        type: Number,vtype:"Number",
        default: 1,
        $ifNull: 0,
      },
    D1: {
     type: String,
      default: "1",
    },
    D2: {
     type: String,
      default: "1",
    },
    D3: {
     type: String,
      default: "1",
    },
    D4: {
     type: String,
      default: "1",
    },
    D5: {
     type: String,
      default: "1",
    },
    D6: {
     type: String,
      default: "1",
    },
    D7: {
     type: String,
      default: "1",
    },
    D8: {
     type: String,
      default: "1",
    },
    D9: {
     type: String,
      default: "1",
    },
    D10: {
     type: String,
      default: "1",
    },
    D11: {
     type: String,
      default: "1",
    },
    D12: {
     type: String,
      default: "1",
    },
    D13: {
     type: String,
      default: "1",
    },
    D14: {
     type: String,
      default: "1",
    },
    D15: {
     type: String,
      default: "1",
    },
    D16: {
     type: String,
      default: "1",
    },
    D17: {
     type: String,
      default: "1",
    },
    D18: {
     type: String,
      default: "1",
    },
    D19: {
     type: String,
      default: "1",
    },
    D20: {
     type: String,
      default: "1",
    },
    D21: {
     type: String,
      default: "1",
    },
    D22: {
     type: String,
      default: "1",
    },
    D23: {
     type: String,
      default: "1",
    },
    D24: {
     type: String,
      default: "1",
    },
    D25: {
     type: String,
      default: "1",
    },
    D26: {
     type: String,
      default: "1",
    },
    D27: {
     type: String,
      default: "1",
    },
    D28: {
     type: String,
      default: "1",
    },
    D29: {
     type: String,
      default: "1",
    },
    D30: {
     type: String,
      default: "1",
    },
    Y_N: {
     type: String,
      default: "0",
    },
    gmStatus: {
      type: String,
      default: "",
      $ifNull: "",
      enum: ["", "Vr"],
    }
  }


  const customerSchema = {
    customerName: {
     type: String,
      default: "",
      $ifNull: "",
    },
    customerID: {
     type: String,
      default: "",
      $ifNull: "",
    },
    customerTIN: {
     type: String,
      default: "",
      $ifNull: "",
    },
    customerBankAccount: {
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
    socielMedia: {
      faceBook: {
       type: String,
        default: "www.facebook.com/",
        $ifNull: "",
      },
      telegram: {
       type: String,
        default: "t.me/",
        $ifNull: "",
      },
      imo: {
       type: String,
        default: "",
        $ifNull: "",
      },
      linkedIn: {
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
        date: { type: Date, default: todday },
      }],*/
    feedback: {
      buyFrequency: {
       type: String,
        default: "",
        $ifNull: "",
        enum: ["", "high", "medium", "low"],
      },
      takesCredit: {
       type: String,
        default: "",
        $ifNull: "",
        enum: ["", "Yes", "No"],
      },
  
      payOnTime: {
       type: String,
        default: "",
        $ifNull: "",
        enum: ["", "yes", "medium", "no"],
      },
      orderClearing: {
       type: String,
        default: "",
        $ifNull: "",
        enum: ["", "high", "medium", "low"],
      },
    },
    rateit: {
      //re-admissions every months....
     type: String,
      default: "A",
      $ifNull: "",
      enum: ["AAA", "AA", "A"],
    },
    reminderDays: {
     type: Number,vtype:"Number",
      default: 0,
    },
  
    notes: {
     type: String,
      default: "",
      $ifNull: "",
      textarea: true,
    },
    gmStatus: {
        type: String,
        enum: ["", "Vr"],
        default: "",
      },
  }


  const leaverequestSchema = {
    companyID: {
     type: String,
      default: "",
    },
    planID: {
     type: String,
      default: "",
    },
    Department: {
     type: String,
      default: "",
    },
    Position: {
     type: String,
      default: "",
    },
    request: {
     type: String,
      enum: ["", "annual leave", "sick leave", "on demand"],
      default: "",
    },
    leaveDate: {
     type: Date,vtype:"Date",
      default: new Date(),
    },
    returnDate: {
     type: Date,vtype:"Date",
      default: new Date(),
    },
  
    days: {
     type: Number,vtype:"Number",
      default: "",
      $ifNull: 0,
    },
    approval: {
     type: String,
      enum: ["No", "Vr"],
      default: "No",
    },
    gmStatus: {
      type: String,
      default: "",
      $ifNull: "",
      enum: ["", "Vr"],
    }
    //--------------
  }

  const maintenanceSchema = {
    request: {
     type: String,
      default: "",
      textarea: true,
    },
  
    requestID: {
     type: String,
      default: "",
    },
    requestStatus: {
     type: String,
      default: "issued",
      enum: ["Maintained", "issued", "None maintained"],
    },
    department: {
     type: String,
      default: "",
    },
    position: {
     type: String,
      default: "",
    },
    maintenanceStatus: {
      maintained: {
       type: String,
        default: "issued",
        enum: ["Yes", "issued", "None maintenable"],
      },
      companyID: {
       type: String,
        default: "",
      },
      spareUsed: {
       type: String,
        default: "",
      },
      description: {
       type: String,
        default: "",
      },
    },
    companyID: {
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

  const mispaySchema = {
    miscellenouseExp: {
     type: String,
      default: "others",
      enum: ["promotion", "fuel", "rent", "capitalReturn", "others"],
    },
    amount: {
     type: Number,vtype:"Number",
      default: 0,
    },
  
    otherExp: {
      name: {
       type: String,
        default: "",
      },
      amount: {
       type: Number,vtype:"Number",
        default: 0,
      },
    },
    receipent_ID: {
     type: String,
      default: "",
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
    //---------------------------------s
  }

  const monpaySchema = {
    monthlySalary: {
     type: Number,vtype:"Number",
      default: 0,
    },
    employeeTax: {
      ////?????????
     type: Number,vtype:"Number",
      default: 0,
    },
    power: {
     type: Number,vtype:"Number",
      default: 0,
    },
    tele: {
     type: Number,vtype:"Number",
      default: 0,
    },
    water: {
     type: Number,vtype:"Number",
      default: 0,
    },
    withhold: {
     type: Number,vtype:"Number",
      default: 0,
    },
    vat: {
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
    //----------------------------
  }
  
  export { employeeSchema,assetSchema,
    attendanceSchema,customerSchema,
  leaverequestSchema,maintenanceSchema,
mispaySchema,monpaySchema}