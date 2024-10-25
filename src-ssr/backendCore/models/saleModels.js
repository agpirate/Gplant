import { mongoose } from "mongoose";
import { saleDBs } from "../dbConns";
// import { customerSchema,goodsSchema,productSchema } from "../backendCore/schemas/saleSchemas";
import { customerSchema,goodsSchema,productSchema } from "../schemas/saleSchemas";
// initialize the connections on boots...
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

//-------
var today = () => new Date().toLocaleString();
const nul = [null, undefined, false, "", [], {}, NaN];

//------------------------------customer Schema
let _customerSchema = new Schema(
  customerSchema,
  {
    timestamps: new Date(),
  }
);

_customerSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt=object.updatedAt.toLocaleDateString()

  return object;
});
//------------------------------Goods Schema
let _goodSchema = new Schema(
  goodsSchema,
  {
    timestamps: new Date(),
  }
);

_goodSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.updatedAt=object.updatedAt.toLocaleDateString()

  object.id = _id;

  //--------
  //object.totalPrice = object.totalPrice + (saleIndex.unitPrice * saleIndex.taken)

  return object;
});

//------------------------------Product Schema
let _productSchema = new Schema(
  productSchema,
  {
    timestamps: new Date(),
  }
);

_productSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt=object.updatedAt.toLocaleDateString()

  //object.timeA=String(object.timeA).split(" ")[4];
  //object.timeB=String(object.timeB).split(" ")[4];

  return object;
});

//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.

var custModel;
if (saleDBs.models['customers'] ?? false) {
  console.log("Collections alread existed on");
} else {
  custModel = saleDBs.model("customers", _customerSchema);
}


var goodModel;
if (saleDBs.models['goods'] ?? false) {
  console.log("Collections alread existed on");
} else {
  goodModel = saleDBs.model("goods", _goodSchema);
}


var productModel;
if (saleDBs.models['products'] ?? false) {
  console.log("Collections alread existed on");
} else {
  productModel = saleDBs.model("products", _productSchema);
}


//-------------------- exporting schemas

export { custModel, goodModel, productModel }; //,customerer, goods and pruduct model };

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