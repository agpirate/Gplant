import { mongoose } from "mongoose";
import { procDBs } from "../dbConns";
import {   assetSchema,
  rawmaterialSchema,supplierSchema, } from "../schemas/procurmentSchema";
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

//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.

var assetModel;
if (procDBs.models['assets'] ?? false) {
  console.log("Collections alread existed on");
} else {
  assetModel = procDBs.model("assets", _assetSchema);
}


var rawModel;
if (procDBs.models['rawmaterials'] ?? false) {
  console.log("Collections alread existed on");
} else {
  rawModel = procDBs.model("rawmaterials", _rawmatterialSchema);
}

var supplierModel;
if (procDBs.models['suppliers'] ?? false) {
  console.log("Collections alread existed on");
} else {
  supplierModel = procDBs.model("suppliers", _supplierSchema);
}
//-------------------- exporting schemas

export { assetModel, rawModel, supplierModel }; //,rawmatterialModel,supplierModel };

//----------------------modeling Schemass
async function getModel(DB,collectionName,collectionSchema) {
  try {
    return await mongoose.model(collectionName);
  } catch (e) {
    if (e.name === 'MissingSchemaError') {
      let _newModel = await DB.model(collectionName, collectionSchema)
      console.log('Creatig New Model'+collectionName,_newModel)
      return _newModel
    }
    throw e;
  }
}