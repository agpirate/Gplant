import { mongoose } from "mongoose";
import { finDBs } from "../dbConns";
import {  mispaySchema,monpaySchema,statementSchema } from "../globalSchemas";

// initialize the connections on boots...
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var today = () => new Date().toLocaleDateString().split("T")[0];
const nul = [null, undefined, false, "", [], {}, NaN];

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

if (finDBs.model.statmentModel) {
  //console.log("assets Collections already existed on Procurment");
} else {
  statmentModel = finDBs.model("statements", _statmentSchema);
}
/**/
var monpayModel;

if (finDBs.model.monpayModel) {
  //console.log("assets Collections already existed on Procurment");
} else {
  monpayModel = finDBs.model("monpayments", _monpaymentSchema);
}

var mispayModel;

if (finDBs.model.mispayModel) {
  //console.log("assets Collections already existed on Procurment");
} else {
  mispayModel = finDBs.model("mispayments", _mispaymentSchema);
}

//-------------------- exporting schemas

export { statmentModel, monpayModel, mispayModel }; //,rawmatterialModel,supplierModel };
