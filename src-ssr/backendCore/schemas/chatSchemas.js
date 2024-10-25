var today = () => new Date();//.toLocaleDateString();//.split("T")[0];
const nul = [null, undefined, false, "", [], {}];
const acceType=['root','regAdmin','columnPower']

import { mongoose } from "mongoose";
import { ref } from "vue";
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;
//------------------------Finance_chema Ends
const chatSchema = {
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
}
const postSchema = {
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
}
//---------------------------Procurment_Schema Ends



//----------------------Human Resource _Schema Ends.....




//-------------------Employee Profile and Meta Edns



//-------------------------Sale_Schema Ends--------------

export {
    chatSchema,postSchema,
    //---------------
}


