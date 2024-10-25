import { mongoose } from "mongoose";
import { chatDBs } from "../dbConns";

import { chatSchema,postSchema } from "../schemas/chatSchemas";


var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

mongoose.set("strictQuery", true);

//-------
var today = () => new Date().toLocaleDateString();
const nul = [null, undefined, false, "", [], {}, NaN];

//------------------------------empy Schema

//-----------Bloging_Pages
//------------------------------comment Schema
let chatSchema = new Schema(
  chatSchema  ,
  {
    timestamps: new Date(),
  }
);

chatSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.updatedAt= nul.includes(object.updatedAt) ? ' ' : object.updatedAt.toLocaleDateString()
  return object;
});

//------------------------------postt Schema
let postSchema = new Schema(
postSchema,
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
var chatModel;
async function __chatmodel (){
  return await getModel(chatDBs,'statements',chatSchema).then((model)=>{
      console.log('Already Existed Model',model)
      chatModel= model
    return model
  }).catch(async (error)=>{ return null})
}
__chatmodel()

var postModel;
async function __postmodel (){
  return await getModel(chatDBs,'posts',postSchema).then((model)=>{
      console.log('Already Existed Model',model)
      postModel= model
    return model
  }).catch(async (error)=>{ return null})
}
__postmodel()
//-------------------- exporting schemas

export {
  chatModel,
  postModel,
}; //,rawModel,supplierModel };

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