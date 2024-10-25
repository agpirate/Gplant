import { ref } from "vue";
//"Array" require enabling enum_values and Stringfiy_"Array"_keyword

//employee-attendance-asset-rawmaterial-goods-supplier-customer-monpay-mispay-statment
const DataPrivilege = {  
  employee: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],
  },

  attendance: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "userAuthorization", "", "gmStatus"],
  },

  plan: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "gmStatus", ""],
  },

  report: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "gmStatus", ""],
  },

  leavereq: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "gmStatus", ""],
  },

  //------------------------------Purchasess
  supplier: {
    type: String,
    enum: ["root", "regAdmin","gmStatus", ""],
    default: "",
    $ifNull: "",
  },
  asset: {
    type: "Array",
    default: [],
    enum: [ //since mongod doen't support enumed_aaray type , but we will use it in client_form building
 
      //it would inserted here, but not on mongoose schema,,since mongoose only looks for "Array" of items
      "root",
      "regAdmin",
      "financeStatus",
      "storeStatus",
      "takenBy",
      "returnedBy",
      "gmStatus",
      "",
    ],
  },
  rawmaterial: {
    type: "Array",
    default: [],
    enum: [ //since mongod doen't support enumed_aaray type , but we will use it in client_form building
 
      //it would inserted here, but not on mongoose schema,,since mongoose only looks for "Array" of items
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
    type: "Array",
    default: [],
    enum: [ //since mongod doen't support enumed_aaray type , but we will use it in client_form building
      "root",
      "regAdmin",
      "financeStatus",
      "financeApStatus",
      "storeStatus",
      "saleStatus",
      "gmStatus",
      "",
    ],
  },
  //--------------------Product & Sales
  customer: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin","gmStatus", ""],
  },
  product: {
    type: "Array",
    default: [],
    enum: [  //since mongod doen't support enumed_aaray type , but we will use it in client_form building
      //it would inserted here, but not on mongoose schema,,since mongoose only looks for "Array" of items
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
    ]
  },

  mainten: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["", "root", "regAdmin", "maintenanceStatus", "gmStatus"],
  },
  //--------------------expense
  statment: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "", "gmStatus"],
  },
  monpay: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "", "gmStatus"],
  },
  mispay: {
    type: String,
    default: "",
    $ifNull: "",
    enum: ["root", "regAdmin", "", "gmStatus"],
  },

  //-----incomes

  //----statments

};


export default DataPrivilege;
