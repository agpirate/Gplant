import { mongoose } from "mongoose";
import { serviceDBs } from "../dbConns";
import {    attendanceSchema,  
    leavereqSchema,planSchema,reportSchema,
    maintenSchema  } from "../schemas/serviceSchemas";

// initialize the connections on boots...
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var today = () => new Date().toLocaleDateString().split("T")[0];
const nul = [null, undefined, false, "", [], {}, NaN];

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


//------------------------------------------------------------------
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
    leavereqSchema,
    { timestamps: today }
  );
  
  _leaveReqSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  let _mainenSchema = new Schema(
    maintenSchema,
    {
      timestamps: new Date(),
    }
  );
  _mainenSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
  
    object.updatedAt= nul.includes(object.updatedAt) ? ' ' : object.updatedAt.toLocaleDateString()
  
  
    return object;
  });

  ///---------------
  var attendModel;
  if (serviceDBs.models['attendances'] ?? false) {
    console.log("Collections alread existed on");
  } else {
    attendModel = serviceDBs.model("attendances", _attendSchema);
  }


var leavereqModel;
if (serviceDBs.models['leavrequests'] ?? false) {
  console.log("Collections alread existed on");
} else {
  leavereqModel = serviceDBs.model("leavereq", _leaveReqSchema);
}


var reportModel;
if (serviceDBs.models['reports'] ?? false) {
  console.log("Collections alread existed on");
} else {
  reportModel = serviceDBs.model("reports", _reportSchema);
}


var planModel;
if (serviceDBs.models['plans'] ?? false) {
  console.log("Collections alread existed on");
} else {
  planModel = serviceDBs.model("plans", _plannerSchema);
}


var maintenModel;
if (serviceDBs.models['maintenances_'] ?? false) {
  console.log("Collections alread existed on");
} else {
  maintenModel = serviceDBs.model("maintenances_", _mainenSchema);
}

//-------------------- exporting schemas

export { attendModel,maintenModel, planModel, reportModel,leavereqModel }; //,rawmatterialModel,supplierModel };

//----------------------modeling Schemass
async function getModel(DB,collectionName,collectionSchema) {
  try {
    let _model = await DB.models[collectionName]
    console.log(_model,'Model Existed')
    return _model
    // return await mongoose.model(collectionName);
  } catch (e) {
    if (e.name === 'MissingSchemaError') {
      let _newModel = await DB.model(collectionName, collectionSchema)
      console.log('Creatig New Model !'+collectionName,_newModel)
      return _newModel
    }
    throw e;
  }
}