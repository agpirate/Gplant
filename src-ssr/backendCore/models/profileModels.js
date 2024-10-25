import { mongoose } from "mongoose";
import { humdDBs } from "../dbConns";
// import { accetype } from "../../services/accessComputing"

import { profileSchema,threeASchema } from "../schemas/profileSchemas";


var Schema = mongoose.Schema
var ObjectId = mongoose.Types.ObjectId;


mongoose.set("strictQuery", true);

//-------
var today = () => new Date().toLocaleDateString();
const nul = [null, undefined, false, "", [], {}, NaN];

//------------------------------empy Schema

let _empySchema = new Schema(
  profileSchema,
 { timestamps: today }
);

_empySchema.method("toJSON",  function () {
 const { __v, _id, ...object } = this.toObject();
 object.id = _id;
 return object;
});
//---------
let _threeASchema = new Schema(
  threeASchema,
  { timestamps: today }
);
_threeASchema.method("toJSON",  function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});




//-----------Bloging_Pages
//------------------------------comment Schema


//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.

var profileModel;
if (humdDBs.models['employees'] ?? false) {
  console.log("Collections alread existed on");
} else {
  profileModel = humdDBs.model("employees", _empySchema);
}

var threeaModel
if (humdDBs.models['threeas'] ?? false) {
  console.log("Collections alread existed on");
} else {
  threeaModel = humdDBs.model("threeas", _threeASchema);
}

//-------------------- exporting schemas

export {
  profileModel,
  threeaModel,
}; //,rawModel,supplierModel };

//----------------------modeling Schemass
async function getModel(DB,collectionName,collectionSchema) {
  try {
    return await mongoose.model(collectionName);
  } catch (e) {
    if (e.name === 'MissingSchemaError') {
      return await DB.model(collectionName, collectionSchema)
    }
    throw e;
  }
}

//----------Inti Values
// import createDoc from "../../services/apiServices/documentCreate"
import {createRolePermissions} from "../../hooks/createThreea"
import {createProfile} from "../../hooks/createProfiles"

async function _initProfiles(){
  let createUpdateKey ='group'
  let threeaIDs = await createRolePermissions(createUpdateKey)
  if(threeaIDs.status == 200){

  //---Creating sample user Profile or root   NB:------ searching objectID value ( require objectID), 
  //but replacing require correct plain_ID_string_value or objectID(ID_string_value)
  let adminID = threeaIDs.data['admin'] ?? false
  let letProfile = {name:'root2',lastName:'root2',keyID:'root@ygp2',companyID:'456123123','acckey':adminID ? new ObjectId(adminID.id) : null}
  let _profile = await createProfile(letProfile,'companyID')
  console.log(_profile.status,'Create Template Profile Detail By ID & for Role ID of ==',new ObjectId(adminID.id))

  }
}
// _initProfiles()