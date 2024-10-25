import { mongoose } from "mongoose";
import { procDBs } from "../dbConns";
import {   assetSchema,maintenSchema,
  rawmaterialSchema,supplierSchema, } from "../globalSchemas";
// initialize the connections on boots...
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

//-------
var today = () => new Date().toLocaleDateString()//.split('T')[0];
const nul = [null, undefined, false, "", [], {}, NaN];

//------------------------------Asset Schema

let _assetSchema = new Schema(
  assetSchema,
  {
    timestamps: new Date(),
  }
);
//N:B-- this methods is active during fetching data as calculator...use for decoding & computedVales on return
//is live acttivities when we fetching data ( is not saved the computed Values)
_assetSchema.method("toJSON", function () {
  //return _id(values as id when returned...)
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt= nul.includes(object.updatedAt) ? ' ' : object.updatedAt.toLocaleDateString()


  //buyting calculating
  //object.supplierID[].push(object.supplierID)

  return object;
});

//------------------------------RAW Matterial Schema
let _rawmatterialSchema = new Schema(
rawmaterialSchema,
  {
    timestamps: new Date(),
  }
);

_rawmatterialSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt= nul.includes(object.updatedAt) ? ' ' : object.updatedAt.toLocaleDateString()


  return object;
});

//------------------------------Supplier Schema

let _supplierSchema = new Schema(
  supplierSchema,
  {
    timestamps: new Date(),
  }
);

_supplierSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt= nul.includes(object.updatedAt) ? ' ' : object.updatedAt.toLocaleDateString()


  //-----------------------

  return object;
});

//------------------------------Maintenance Schema

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

//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.

var assetModel;
////////console.log('is assetModel Exist',Object.keys(procDBs.model.asset))
if (procDBs.model.assetModel) {
  //////console.log("assets Collections already existed on Procurment");
} else {
  assetModel = procDBs.model("assets", _assetSchema);
}

var rawModel;

if (procDBs.model.rawModel) {
  //////console.log("raws Collections already existed on Procurment");
} else {
  rawModel = procDBs.model("rawmaterials", _rawmatterialSchema);
}

var supplierModel;

if (procDBs.model.supplierModel) {
  //////console.log("supplier Collections already existed on Procurment");
} else {
  supplierModel = procDBs.model("suppliers", _supplierSchema);
}

var maintenModel;

if (procDBs.model.maintenModel) {
  //////console.log("supplier Collections already existed on Procurment");
} else {
  maintenModel = procDBs.model("maintenances", _mainenSchema);
}

//-------------------- exporting schemas

export { assetModel, rawModel, supplierModel, maintenModel }; //,rawmatterialModel,supplierModel };
