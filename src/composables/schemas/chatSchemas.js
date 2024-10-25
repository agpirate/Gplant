var ObjectId = 'objectId'
let String ='String'
let Number ='Number'
let Array ='Array'
// let Date ='Date'

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


