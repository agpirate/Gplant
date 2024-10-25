import { mongoose } from "mongoose";
import { finDBs } from "../dbConns";
import {  mispaySchema,monpaySchema,statementSchema } from "../schemas/financeSchemas";

// initialize the connections on boots...
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
var today = () => new Date().toLocaleDateString()//.split("T")[0];

//------------------------------------------------------------------
let _statmentSchema = new Schema(
  statementSchema,
  {
    timestamps: today,
    //{currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

_statmentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.updatedAt=object.updatedAt.toLocaleDateString()

  return object;
});

//------------------------------------------
//--------------defining / importing Schemas
let _monpaymentSchema = new Schema(
 monpaySchema,
  {
    timestamps: today,
    //{currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

_monpaymentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.updatedAt=object.updatedAt.toLocaleDateString()

  return object;
});

//----------------------modeling Schemass

let _mispaymentSchema = new Schema(
 mispaySchema,
  {
    timestamps: today,
    //{currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

_mispaymentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.updatedAt=object.updatedAt.toLocaleDateString()

  return object;
});

//----------------------------------------------------------------------
var statmentModel;
if (finDBs.models['statements'] ?? false) {
  console.log("Collections alread existed on");
} else {
  statmentModel = finDBs.model("statements", _statmentSchema);
}

/**/
var monpayModel;
if (finDBs.models['monpayments'] ?? false) {
  console.log("Collections alread existed on");
} else {
  monpayModel = finDBs.model("monpayments", _monpaymentSchema);
}


var mispayModel;
if (finDBs.models['mispayments'] ?? false) {
  console.log("Collections alread existed on");
} else {
  mispayModel = finDBs.model("mispayments", _mispaymentSchema);
}


//-------------------- exporting schemas

export { statmentModel, monpayModel, mispayModel }; //,rawmatterialModel,supplierModel };

//----------------------modeling Schemass
async function getModel(DB,collectionName,collectionSchema) {
  try {
    let a = await DB.models({name:collectionName});
    console.log('Creatig New Modelff',a)
    return a
  } catch (e) {
    if (e.name === 'MissingSchemaError') {
      let _newModel = await DB.model(collectionName, collectionSchema)
      console.log('Creatig New Model'+collectionName,_newModel)
      return _newModel
    }
    throw e;
  }
}