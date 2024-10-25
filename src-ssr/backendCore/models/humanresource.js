import { mongoose } from "mongoose";
import { humdDBs } from "../dbConns";
import { accetype } from "../../services/accessComputing"
import {    attendanceSchema,employeeSchema,
  leaverequestSchema,planSchema,reportSchema} from "../globalSchemas";
//import { attendStore } from "src/stores/dataStores/attendStore";
//import { accComputing } from "../../services/accessComputing"
// initialize the connections on boots...
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

mongoose.set("strictQuery", true);

//-------
var today = () => new Date().toLocaleDateString();
const nul = [null, undefined, false, "", [], {}, NaN];
//------------------------------empy Schema

let _empySchema = new Schema(
   employeeSchema,
  { timestamps: today }
);

_empySchema.method("toJSON",  function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt= nul.includes(object.updatedAt) ? ' ' : object.updatedAt.toLocaleDateString()

  //is_user // root,regAdmin,[status_controller]
  //object.accprivileges = await accComputing();;
  //enum datatype require exactselections options..but other Number/"String" could handle null,undefined values
  //but takecare enum values and numbers(which has to be used in computing_equations( w/c shouldn't be null/undefined))
  //object.department.role= nul.includes(object.department.role) ? "" : object.department.role
  // object.department.role= nul.includes(object.department.mainRole) ? "" : object.department.mainRole
  //---------------

  return object;
});

//------------------------------Attendance Schema
let _attendSchema = new Schema(
  attendanceSchema,
  { timestamps: today }
);
_attendSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt= nul.includes(object.updatedAt) ? ' ' : object.updatedAt.toLocaleDateString()
  object.date= nul.includes(object.date) ? ' ' : object.date.toLocaleDateString()

  return object;
});

let _plannerSchema = new Schema(
  planSchema,
  { timestamps: today }
);

_plannerSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

let _reportSchema = new Schema(
  reportSchema,
  { timestamps: today }
);

_reportSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

let _leaveReqSchema = new Schema(
  leaverequestSchema,
  { timestamps: today }
);

_leaveReqSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

//-----------Bloging_Pages
//------------------------------comment Schema
let comtSchema = new Schema(
  {
    contents: {
      type: String,
      default: "",
      $ifNull: "",
    },
    postID: {
      type: ObjectId,
      default: null,
      ref: "posts",
    },
    name: {
      type: String,
      default: "",
    },
    userID: {
      type: ObjectId,
      default: null,
      ref: "employees",
    },
  },
  {
    timestamps: new Date(),
  }
);

comtSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.updatedAt= nul.includes(object.updatedAt) ? ' ' : object.updatedAt.toLocaleDateString()
  return object;
});

//------------------------------postt Schema
let postSchema = new Schema(
  {
    header: {
      type: String,
      default: "",
    },
    contents: {
      type: String,
      default: "",
    },
    mainRole: { type: String, default: "" },
    name: {
      type: String,
      default: "",
      $ifNull: "",
    },
    userID: {
      type: ObjectId,
      default: null,
      ref: "employees",
    },
    rate: {
      type: Array,
      default: [[], [], []],
      $ifNull: [[]],
    },
  },
  {
    timestamps: new Date(),
  }
);

postSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.

var leavereqModel;
////console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (humdDBs.model.leavereqModel) {
  //console.log("employeess Collections already existed on Procurment");
} else {
  leavereqModel = humdDBs.model("leavrequests", _leaveReqSchema);
}

var reportModel;
////console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (humdDBs.model.reportModel) {
  //console.log("employeess Collections already existed on Procurment");
} else {
  reportModel = humdDBs.model("reports", _reportSchema);
}

var planModel;
////console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (humdDBs.model.planModel) {
  //console.log("employeess Collections already existed on Procurment");
} else {
  planModel = humdDBs.model("plans", _plannerSchema);
}

var empyModel;
////console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (humdDBs.model.empyModel) {
  //console.log("employeess Collections already existed on Procurment");
} else {
  empyModel = humdDBs.model("employees", _empySchema);
}

var attendModel;

if (humdDBs.model.attendModel) {
  //console.log("raws Collections already existed on Procurment");
} else {
  attendModel = humdDBs.model("attendances", _attendSchema);
}

var comtModel;

if (humdDBs.model.comtModel) {
  //console.log("supplier Collections already existed on Procurment");
} else {
  comtModel = humdDBs.model("comments", comtSchema);
}

var postModel;

if (humdDBs.model.postModel) {
  //console.log("supplier Collections already existed on Procurment");
} else {
  postModel = humdDBs.model("posts", postSchema);
}
//-------------------- exporting schemas

export {
  leavereqModel,
  reportModel,
  planModel,
  empyModel,
  attendModel,
  comtModel,
  postModel,
}; //,rawModel,supplierModel };
