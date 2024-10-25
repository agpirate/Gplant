var today = () => new Date();//.toLocaleDateString();//.split("T")[0];
var ObjectId = 'objectId'
let String ='String'
let Number ='Number'
let Array ='Array'
// let Date ='Date'

//------------
const statmentSchema= 
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
  Income: {
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },

  Expense: {
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
  userID: {
    type: String,vtype:"String",
    default: "",
  },
  //---------------------------------

  tIP: {
    //total income paid
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tIR: {
    //total income receiavable
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
 //--------------------------
  tXP: {
    //total expense paid
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tXR: {
    //total expense payable
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },

  //---------------------
  tIGs: {
    //total expense payable
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tIPr: {
    //total expense payable
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },

  //--------------net
  tP: {
    //net income
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tR: {
    //net expense
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tI: {
    //net income
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
  tX: {
    //net expense
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },

  Incm: {
    //net expense
    type: Number,vtype:"Number",
    $ifNull: 0,
    default: 0,
  },
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
      userID: {
        type: String,vtype:"String",
        $ifNull: "",
        default: "",
      },
      //---------------------------------
      
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
  userID: {
    type: String,vtype:"String",
    $ifNull: "",
    default: "",
  },
  //---------------------------------

}

export {

    statmentSchema,monpaySchema,mispaySchema
}

