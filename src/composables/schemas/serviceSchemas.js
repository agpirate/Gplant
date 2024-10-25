


var ObjectId = 'objectId'
let String ='String'
let Number ='Number'
let Array ='Array'
// let Date ='Date'

const attendanceSchema = 
{

  date: {
    type: Date,vtype:"Date", 
    default: new Date(),
    $ifNull: new Date(),
  },
  userID: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
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
    default: 0.1,
    $ifNull: 0.1,
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

  Y_N: {
    type: String,vtype:"String",
    default: "0",
  },
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },

  //-------

}


const maintenSchema = 
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
    userID: {
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
  userID: {
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
  userID: {
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
    type: Date,vtype:"Date",
    $ifNull: new Date(),
    default: new Date(),
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
  userID: {
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
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    $ifNull: "",
    default: "",
  },
}

const leavereqSchema = 
{

  userID: {
    type: String,vtype:"String",
    default: "",
  },
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
  gmStatus: {
    type: String,vtype:"String",
    enum: ["", "Vr"],
    default: "",
  },
}


export { 
    attendanceSchema,
    leavereqSchema,planSchema,reportSchema,
    maintenSchema }